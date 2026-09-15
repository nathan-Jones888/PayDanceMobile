# 膳眸智识 (DietVision AI) 一键启动脚本
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " 🚀 正在启动 膳眸智识 (DietVision AI) 前后端服务... " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$BackendDir = Join-Path $CurrentDir "diet-vision-backend"
$FrontendDir = Join-Path $CurrentDir "diet-vision-app"

# 1. 查找最适合的 Python 解释器 (优先 Python 3.8+)
$PythonExe = "python"
if (Test-Path "D:\Program Files (x86)\PYTHON\python.exe") {
    $PythonExe = "D:\Program Files (x86)\PYTHON\python.exe"
}

# 1. 启动后端 Python FastAPI 服务
Write-Host "`n[1/2] 正在启动 Python 后端服务 (端口: 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BackendDir'; Write-Host '🚀 后端 API 服务已启动: http://localhost:8000/docs' -ForegroundColor Green; & '$PythonExe' -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# 2. 启动前端 Vue3 移动端服务
Write-Host "[2/2] 正在启动 前端移动端应用 (端口: 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendDir'; Write-Host '📱 前端应用已启动: http://localhost:5173' -ForegroundColor Green; npm run dev"

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host " ✨ 启动完成！" -ForegroundColor Green
Write-Host " 👉 前端体验地址: http://localhost:5173" -ForegroundColor White
Write-Host " 👉 后端接口文档: http://localhost:8000/docs" -ForegroundColor White
Write-Host "==================================================" -ForegroundColor Cyan
