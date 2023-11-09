#!/bin/bash

echo -e "${BLUE}Cleaning up...${RESET}"

echo -e "${RED}REMOVE${RESET} .nx folder"
rm -rf .nx

echo -e "${RED}REMOVE${RESET} dist folder"
rm -rf dist

echo -e "${RED}REMOVE${RESET} tmp folder"
rm -rf tmp

echo -e "${RED}REMOVE${RESET} bazel output folders"
rm -rf bazel-*

echo ""
echo -e "${GREEN}✅ Successfully cleaned up the workspace!${RESET}"
echo ""
