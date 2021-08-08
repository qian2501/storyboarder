# Storyboarder

Storyboarder makes it easy to visualize a story as fast you can draw stick figures. Quickly draw to test if a story idea works. Create and show animatics to others. Express your story idea without making a movie.

For original README please refer to [this file](README_orig.md).

# About this fork

This fork is meant to make this tool usable.

Since the original repo have been stopped develop since May, 2021, and too many user hostile issue un-resolved, I decided to make my own fork and make this tool more usable.

Please note that this fork may never develop new feature.

# Build

The same as any other Electron project.

electron-builder is used here, inherited from the origin repo.

## Pre-requisite
Have node.js installed and run
`npm install`

## Distribution
For Windows:
`npm run dist:win`

For Mac:
`npm run dist:mac`

For Linux:
`npm run dist:linux`

After build finished, you may find it under `dist` folder under the folder cloned this repo.

## A few annoying things
On Windows DO NOT build with npm installed within WSL, no matter what console emulator you use.

On Mac you may get rejected by Apple when running since notarizing is skipped, which cost a lot for a non-profit personal project. You need to bypass it you know how.

Linux is untested, it's hard to say if it ever works.

# Issues

Since I am the only person on this repo now, issues may not be handled in time. But please do submit issue if there is a bug, and please refer to the basic format from the original repo.

# Releases

I may not do any release in any short term.
So at least for now, please build on your own. If you are not a tech guy, please go for your tech friends.
