@echo off
chcp 65001
TITLE 编译文件移动脚本
set ORIGINAL_PATH=%cd%
cd ../..
set VUE_BUILT_PATH=%cd%
set TARGET_DEL_DIR=vuetest
set CURRENT_PATH=%VUE_BUILT_PATH%\%TARGET_DEL_DIR%
set input=N


if not exist %ORIGINAL_PATH%\dist (
    echo 编译目录不存在, 已退出脚本!
    pause
    exit
)

:begin
if not exist %CURRENT_PATH% (
    echo 正在移动编译文件夹...
    move %ORIGINAL_PATH%\dist %CURRENT_PATH%
    pause
    exit
)

echo 路径: %CURRENT_PATH%
set /p input="本文件夹下的所有文件将被删除！此操作不可逆！[Y/N]  "

if %input% == Y (
    echo 已确认删除!
    rd/s/q %CURRENT_PATH%
    goto begin
) else (
    echo 已取消.
)

cd %ORIGINAL_PATH%
pause