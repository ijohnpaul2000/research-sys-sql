@echo off
title Server running...
call forever start index.js
echo Servers up!
pause >null