Write-Host "正在启动本地服务器..." -ForegroundColor Green
Write-Host ""
Write-Host "服务器启动后，请在浏览器中访问: http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Cyan
Write-Host ""

# 尝试使用 Python
try {
    python -m http.server 8000
} catch {
    Write-Host "Python 未找到，请尝试以下方法之一：" -ForegroundColor Red
    Write-Host "1. 安装 Python: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "2. 使用 VS Code Live Server 扩展" -ForegroundColor Yellow
    Write-Host "3. 直接双击 index.html 文件（部分功能可能不可用）" -ForegroundColor Yellow
    pause
}

