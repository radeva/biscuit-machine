# Biscuit Machine

This is a sample project I was tasked with when I applied for an engineering position at a company. The project required from me to learn React from scratch since I didn't have any React experience before that.

## The Problem

Design a system to control a Biscuit Machine where biscuits should start baking process once the oven reaches certain degrees. On the other hand it shouldn't overheat and should maintain temperature between 220 and 240 degrees.

There is an option to pause the baking process or to turn it off. When turned off, the machine should complete the biscuits already on the baking belt and then turn off.

## The Solution

### Tools & Technologies

- React v16
- React Testing Library
- ESLint
- Prettier

### Run locally

- Navigate to the project main folder
- Install dependencies using `npm i`
- Run `export NODE_OPTIONS=--openssl-legacy-provider && npm start`

### Preview Demo

Checkout the [animated gif demo](biscuit-machine.gif) in this repository or [preview on Netlify](https://quirky-chandrasekhar-35a011.netlify.app/).
