#!/bin/bash

echo -e "${BLUE}Cleaning up workspace...${RESET}"

echo -e "${RED}REMOVE${RESET} .nx directory"
rm -rf .nx

echo -e "${RED}REMOVE${RESET} root dist directory"
rm -rf dist

echo -e "${RED}REMOVE${RESET} library dist directories"
rm -rf libs/**/dist

echo -e "${RED}REMOVE${RESET} tmp directory"
rm -rf tmp

echo -e "${RED}REMOVE${RESET} bazel output directories"
rm -rf bazel-*

echo -e "${RED}REMOVE${RESET} next.js output directories"
rm -rf apps/**/.next

echo ""
echo -e "${GREEN}✅ Successfully cleaned up the workspace!${RESET}"
echo ""
