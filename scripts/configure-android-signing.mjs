import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const localSigningEnvFile = path.join(projectRoot, "android-signing", "signing.env");
const gradleFile = path.join(
  projectRoot,
  "src-tauri",
  "gen",
  "android",
  "app",
  "build.gradle.kts",
);
const gradlePropertiesFile = path.join(
  projectRoot,
  "src-tauri",
  "gen",
  "android",
  "gradle.properties",
);

try {
  const localSigningEnv = await readFile(localSigningEnvFile, "utf8");
  for (const line of localSigningEnv.split(/\r?\n/)) {
    const match = line.match(/^\s*(PAYDANCE_(?:KEYSTORE|KEY)_PASSWORD)\s*=\s*(.*?)\s*$/);
    if (match?.[1] && match[2] && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const keystorePath = process.env.PAYDANCE_KEYSTORE_PATH ?? path.join(
  projectRoot,
  "android-signing",
  "paydance-release.jks",
);
const storePassword = process.env.PAYDANCE_KEYSTORE_PASSWORD;
const keyPassword = process.env.PAYDANCE_KEY_PASSWORD;

if (!storePassword || !keyPassword) {
  console.error(
    "Set PAYDANCE_KEYSTORE_PASSWORD and PAYDANCE_KEY_PASSWORD before building the signed APK.",
  );
  process.exit(1);
}

const source = await readFile(gradleFile, "utf8");
const signingBlock = `\n    signingConfigs {\n        create("paydanceRelease") {\n            storeFile = file(${JSON.stringify(keystorePath)})\n            storePassword = providers.gradleProperty("paydance.storePassword").get()\n            keyAlias = "paydance"\n            keyPassword = providers.gradleProperty("paydance.keyPassword").get()\n        }\n    }\n`;
const gradleProperties = await readFile(gradlePropertiesFile, "utf8");
const withoutSigningProperties = gradleProperties
  .split(/\r?\n/)
  .filter((line) => !line.startsWith("paydance.storePassword=") && !line.startsWith("paydance.keyPassword="))
  .concat([
    `paydance.storePassword=${storePassword}`,
    `paydance.keyPassword=${keyPassword}`,
  ])
  .join("\n");
const withoutSigningConfig = source.replace(
  /\r?\n    signingConfigs \{[\s\S]*?\r?\n    \}\r?\n(?=    buildTypes \{)/m,
  "\n",
);
const withoutSigningBinding = withoutSigningConfig.replace(
  /\r?\n            signingConfig = signingConfigs\.getByName\("paydanceRelease"\)/g,
  "",
);
const configuredSource = withoutSigningBinding.replace(
  /\r?\n    buildTypes \{/m,
  `${signingBlock}    buildTypes {`,
).replace(
  /getByName\("release"\) \{\r?\n/m,
  'getByName("release") {\n            signingConfig = signingConfigs.getByName("paydanceRelease")\n',
);

await writeFile(gradleFile, configuredSource, "utf8");
await writeFile(gradlePropertiesFile, withoutSigningProperties, "utf8");