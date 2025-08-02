# Detect Critical Upgrade Agent

This Forta bot detects high-risk smart contract upgrades by monitoring `Upgraded` events (commonly used by OpenZeppelin proxies).

## Features
- Monitors for proxy `Upgraded` events
- Emits high-severity alerts when implementation changes
- Includes simulation script for local testing

## Usage

### Install Dependencies
