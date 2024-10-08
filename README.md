
# GoPilot

The Governance Framework for urban transport

![Demo Image](https://ik.imagekit.io/scriptscrypt/GoPilot%20-%20header.png?updatedAt=1728392582708)

## Tech Stack

| Tech | Link |
| ----------------- | ----------------- |
| Anchor Rust | https://www.anchor-lang.com
| SolPG | https://beta.solpg.io
| Expo| https://expo.dev
| React Native | https://reactnative.dev
| Dynamic SDK| https://dynamic.xyz
| Reclaim Protocol SDK| https://www.reclaimprotocol.org

## Local Development 

Clone the [repository](https://github.com/scriptscrypt/GoPilot-App/)

Install Nodejs Runtime (If not installed) - https://nodejs.org/en/download

Install all the dependencies 
`yarn`

Run the Development server

If you're using Metro (make sure to have Metro App on the Emulator / Physical Device) : 
`yarn dev`

If you're using Android : 
`yarn android`
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

NEXT_PUBLIC_MONGODB_URI=Your Mongo DB URI
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN= Your Telegram Bot Token
NEXT_PUBLIC_TELEGRAM_CHAT_ID=-100XXXXXX
NEXT_PUBLIC_ENVIROMENT=Your environment - development || production

All the configs for it will be available in `src/lib/envConfig/envConfig.ts`

