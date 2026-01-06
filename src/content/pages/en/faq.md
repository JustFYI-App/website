---
title: "Frequently Asked Questions"
description: "Frequently asked questions about Just FYI, the privacy-first anonymous contact tracing app."
lang: en
pageSlug: "faq"
order: 4
---

Find answers to common questions about Just FYI below. Questions are organized by category to help you find what you need.

## Privacy

### How does Just FYI protect my identity?

Just FYI uses a unique Anonymous ID that cannot be traced back to you. We never collect your name, email, phone number, or any other personal information. Interaction data is encrypted and stored securely to enable the notification system.

### Can anyone identify me through Just FYI?

No. Just FYI is designed to make identification impossible. Your Anonymous ID is a random string that has no connection to your real identity. Even if someone received an exposure notification from an interaction with you, they would have no way to determine who you are.

### Does Just FYI track my location?

No. Just FYI uses Bluetooth Low Energy (BLE) only to detect nearby devices. We do not use GPS, Wi-Fi location, or any other location services. Your location is never recorded or transmitted.

### What data is stored?

Just FYI stores your Anonymous ID, a history of interactions with other Just FYI users (as anonymous IDs), and notification preferences. All data is encrypted for security.

### Can I delete my data?

Yes, at any time. From your profile settings, you can export your data, delete your interaction history, or delete all your data from the server. You can also generate a new Anonymous ID which effectively starts you fresh. Uninstalling the app removes all local data from your device.

## Usage

### How do I use Just FYI?

After downloading the app:
1. Open Just FYI and allow the necessary permissions
2. Your Anonymous ID is automatically generated
3. Keep Bluetooth enabled to record interactions
4. If you need to report an exposure, use the report feature in the app
5. You will receive notifications if you may have been exposed

### Do I need to create an account?

No. Just FYI does not require any account creation. There is no email, password, or sign-up process. Just download the app and start using it.

### How close do I need to be to another user?

Just FYI uses Bluetooth Low Energy, which typically has a range of about 10 meters (33 feet). The app records interactions when you are in close proximity to another Just FYI user for a meaningful period of time.

### Does the other person need to have Just FYI installed?

Yes. Just FYI can only record interactions between devices that both have the app installed and running with Bluetooth enabled.

### Does Just FYI work when I'm using other apps?

Just FYI works best when the app is open. We recommend having the app open when you want to record interactions.

## Technical

### What permissions does Just FYI need?

Just FYI requires:
- **Bluetooth**: To detect and interact with nearby Just FYI users
- **Notifications**: To alert you about potential exposures

We do not request access to your location, camera, microphone, contacts, or any other sensitive permissions.

### Does Just FYI drain my battery?

Just FYI is designed to be battery-efficient using Bluetooth Low Energy technology. Most users do not notice a significant impact on battery life. If you experience issues, please check your device settings or contact support.

### Does Just FYI work offline?

Yes. Just FYI records interactions locally on your device without needing an internet connection. Interactions will be synced to the cloud once you are connected. However, you will need an internet connection to:
- Report an exposure
- Receive exposure notifications
- Download app updates

### What devices are supported?

Just FYI requires:
- **Android**: Version 12 or higher with BLE support
- **iOS**: Version 15.0 or higher

Most smartphones manufactured after 2021 should be compatible.

### Is Just FYI open source?

Just FYI is source-available, not open source. Our source code is publicly available for review, auditing, and contributions. Non-commercial use is permitted, but commercial use requires explicit permission. Visit our [GitHub repository](https://github.com/JustFYI-App/JustFYI) to explore the code.

## Safety

### What should I do if I receive an exposure notification?

If you receive a notification:
1. Do not panic - the notification is anonymous and general
2. Consider getting tested at a healthcare facility
3. Follow recommended health guidelines
4. Consult with a healthcare professional if you have concerns

The notification will show the username of the person who reported (as recorded at the time of your interaction) but does not provide any diagnosis.

### Is Just FYI a substitute for medical advice?

No. Just FYI is a notification tool only. It does not provide medical advice, diagnosis, or treatment recommendations. Always consult with a healthcare professional for medical concerns.

### What if I make a false report?

False reports undermine the trust and effectiveness of the system. Please only report genuine exposures. If you accidentally make an incorrect report, we recommend removing it from your report history in the app.

### How accurate are the notifications?

Just FYI provides best-effort notifications based on recorded user interactions. While we strive for accuracy:
- Not all exposures may be detected (e.g., if the other user did not have the app)
- Some notifications may be for low-risk interactions
- Always use the notification as one factor in your health decisions, not the only factor

### Who can see my exposure reports?

Only people you directly interacted with will receive your notification. They will see your username as it was recorded at the time of interaction. No one outside of your direct interactions can receive or see your reports.
