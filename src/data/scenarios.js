export const scenarios = [
  // WORKSTATION SCENARIOS
  {
    id: 'phishing-email',
    type: 'email',
    title: 'Suspicious Password Reset',
    context: 'You receive an email from "IT Support <support@company-secure.net>" with the subject "URGENT: Password Reset Required". The email asks you to click a link to reset your password within 24 hours or your account will be suspended.',
    choices: [
      {
        text: 'Click the link and reset your password immediately',
        correct: false,
        feedback: 'This is a phishing attempt! The sender domain (company-secure.net) doesn\'t match your company\'s actual domain. Never click links in suspicious emails.',
      },
      {
        text: 'Forward the email to IT Security and mark it as suspicious',
        correct: true,
        feedback: 'Excellent! You recognized the warning signs: urgency pressure, suspicious sender domain, and generic greeting. Always report phishing attempts.',
      },
      {
        text: 'Reply to ask if this is legitimate',
        correct: false,
        feedback: 'Replying confirms your email is active and reaches a real person. This makes you a more attractive target for future attacks.',
      },
    ],
    points: 100,
  },
  {
    id: 'invoice-malware',
    type: 'email',
    title: 'Invoice from Unknown Vendor',
    context: 'An email arrives from "billing@quickpay-invoices.com" with an attachment named "Invoice_29847.pdf.exe". The email claims you owe $3,847 and must pay within 7 days to avoid late fees.',
    choices: [
      {
        text: 'Open the attachment to check the invoice details',
        correct: false,
        feedback: 'The attachment has a double extension (.pdf.exe) - it\'s actually an executable file! Opening it could install malware on your computer.',
      },
      {
        text: 'Delete the email and check with your finance team',
        correct: true,
        feedback: 'Great thinking! Verifying with your finance team before acting on unexpected invoices is the safest approach. They can confirm if this vendor is legitimate.',
      },
      {
        text: 'Pay the invoice to avoid late fees',
        correct: false,
        feedback: 'Never pay invoices without verification. Scammers use urgency and late fee threats to pressure quick payments.',
      },
    ],
    points: 100,
  },
  {
    id: 'ceo-fraud',
    type: 'email',
    title: 'Urgent CEO Request',
    context: 'You receive an email from "Michael Roberts CEO <m.roberts@company-mail.co>" asking you to urgently wire $45,000 for a confidential acquisition. He asks you to keep this between you two and act quickly.',
    choices: [
      {
        text: 'Process the wire transfer - the CEO needs help',
        correct: false,
        feedback: 'This is a Business Email Compromise (BEC) attack! Real executives don\'t request emergency wire transfers via email asking for secrecy.',
      },
      {
        text: 'Call the CEO directly using a known phone number to verify',
        correct: true,
        feedback: 'Excellent! Always verify through a separate communication channel. Real urgent requests can wait for a quick phone verification.',
      },
      {
        text: 'Email back asking for more details',
        correct: false,
        feedback: 'Replying to the email just contacts the scammer, who will provide convincing fake details. Always verify through a different channel.',
      },
    ],
    points: 100,
  },
  {
    id: 'software-download',
    type: 'device',
    title: 'Free Software Download',
    context: 'You need PDF editing software urgently. You find a website offering "Free Adobe Acrobat Pro Download" and another offering a "cracked" version. Your company has licensed software available through IT.',
    choices: [
      {
        text: 'Download from the free Adobe site - it\'s urgent',
        correct: false,
        feedback: 'Sites offering free versions of paid software typically bundle malware. The "free" software costs far more when your system is compromised.',
      },
      {
        text: 'Contact IT to install the company\'s licensed version',
        correct: true,
        feedback: 'IT can quickly install licensed software or suggest approved alternatives. They may have faster solutions than you expect.',
      },
      {
        text: 'Download the cracked version - many people use them',
        correct: false,
        feedback: 'Pirated software frequently contains malware and violates licensing laws. Using it on a work computer could expose the entire network.',
      },
    ],
    points: 100,
  },

  // PHONE SCENARIOS
  {
    id: 'tech-support-scam',
    type: 'phone',
    title: 'Microsoft Support Call',
    context: 'You receive a call from someone claiming to be from "Microsoft Technical Support". They say your computer is infected with malware and they need remote access to fix it. They sound professional and concerned.',
    choices: [
      {
        text: 'Follow their instructions - Microsoft is trusted',
        correct: false,
        feedback: 'Microsoft never makes unsolicited calls about computer problems. This is a tech support scam designed to install malware or steal money.',
      },
      {
        text: 'Hang up immediately and report to IT Security',
        correct: true,
        feedback: 'Correct! Legitimate tech companies don\'t cold-call about computer issues. Reporting helps protect others who might receive similar calls.',
      },
      {
        text: 'Ask for their employee ID to verify',
        correct: false,
        feedback: 'Scammers easily provide fake employee IDs. Any "verification" they offer is meaningless. The safest action is to end the call.',
      },
    ],
    points: 100,
  },
  {
    id: 'vendor-call',
    type: 'phone',
    title: 'Vendor Information Request',
    context: 'A caller claims to be your new account manager from a vendor your company uses. They ask to confirm your company\'s tax ID, payment method on file, and authorized signers for "record updates".',
    choices: [
      {
        text: 'Provide the information - they know your account',
        correct: false,
        feedback: 'Scammers research companies online to sound credible. This information could enable fraud. Never provide sensitive info to inbound callers.',
      },
      {
        text: 'Look up the vendor\'s official number and call back to verify',
        correct: true,
        feedback: 'Excellent! Always verify through independently obtained contact information. Call using the number from their official website.',
      },
      {
        text: 'Transfer the call to finance to handle',
        correct: false,
        feedback: 'Transferring passes the problem to someone else who might not recognize the scam. Verify first before involving others.',
      },
    ],
    points: 100,
  },

  // PHYSICAL SECURITY SCENARIOS
  {
    id: 'usb-drive',
    type: 'device',
    title: 'Found USB Drive',
    context: 'Walking through the parking lot, you find a USB drive labeled "Salary Data 2024 - Confidential". It looks like standard company equipment. Someone from HR might have dropped it.',
    choices: [
      {
        text: 'Plug it into your computer to identify the owner',
        correct: false,
        feedback: 'NEVER plug in unknown USB drives! "USB drop attacks" use curiosity-triggering labels. The drive could contain malware that runs automatically.',
      },
      {
        text: 'Turn it in to IT Security without plugging it in',
        correct: true,
        feedback: 'Perfect! IT has safe ways to examine unknown devices. This could be a lost legitimate drive or a deliberate attack - either way, IT should handle it.',
      },
      {
        text: 'Bring it to HR since it mentions salary data',
        correct: false,
        feedback: 'Even bringing it to HR risks someone plugging it in. The label is designed to exploit curiosity. IT Security has proper procedures.',
      },
    ],
    points: 100,
  },
  {
    id: 'tailgating',
    type: 'physical',
    title: 'Tailgating at the Door',
    context: 'As you badge into the office, someone in a delivery uniform carrying boxes calls out: "Hey, could you hold the door? My hands are full!" They seem friendly and in a hurry.',
    choices: [
      {
        text: 'Hold the door - they\'re clearly a delivery person',
        correct: false,
        feedback: 'Uniforms can be faked. Tailgating is how unauthorized people bypass physical security. Even legitimate delivery workers should follow proper procedures.',
      },
      {
        text: 'Politely direct them to the visitor entrance',
        correct: true,
        feedback: 'Correct! Legitimate delivery personnel should use proper visitor procedures. Politely explaining security requirements protects everyone.',
      },
      {
        text: 'Take the packages and bring them inside yourself',
        correct: false,
        feedback: 'Never accept unknown packages. They could contain anything from surveillance devices to harmful materials. Let security handle it.',
      },
    ],
    points: 100,
  },
  {
    id: 'clean-desk',
    type: 'physical',
    title: 'Documents Left at Printer',
    context: 'You notice confidential financial reports left on the shared printer. They\'ve been there for at least 20 minutes and you don\'t recognize whose they are.',
    choices: [
      {
        text: 'Leave them - the owner will come back',
        correct: false,
        feedback: 'Confidential documents should never be left unattended. Anyone passing by could read or photograph sensitive information.',
      },
      {
        text: 'Secure the documents and notify your manager or security',
        correct: true,
        feedback: 'Good thinking! Securing abandoned confidential documents and reporting the incident helps maintain data security.',
      },
      {
        text: 'Throw them away to dispose of them securely',
        correct: false,
        feedback: 'Don\'t destroy documents that aren\'t yours. The owner may need them, and proper disposal requires shredding, not regular trash.',
      },
    ],
    points: 100,
  },

  // BREAK ROOM SCENARIOS
  {
    id: 'public-wifi',
    type: 'network',
    title: 'Working on Public WiFi',
    context: 'You\'re at a coffee shop and need to access work email and financial reports. You see "CoffeeShop_Free" (open network) and can also use your phone\'s hotspot.',
    choices: [
      {
        text: 'Use CoffeeShop_Free - it\'s convenient',
        correct: false,
        feedback: 'Open networks have no encryption. Anyone nearby can potentially intercept your traffic, capturing passwords and sensitive documents.',
      },
      {
        text: 'Use your phone\'s mobile hotspot',
        correct: true,
        feedback: 'Your personal hotspot is the safest option - you control the connection and it\'s not shared with strangers. Even better with a VPN.',
      },
      {
        text: 'Use the WiFi but avoid sensitive sites',
        correct: false,
        feedback: 'If you\'re working, you\'ll inevitably need to access work resources. Limiting yourself is impractical and you might forget.',
      },
    ],
    points: 100,
  },
  {
    id: 'shoulder-surfing',
    type: 'physical',
    title: 'Shoulder Surfing Situation',
    context: 'While working in the break room, you notice someone you don\'t recognize standing nearby, seemingly watching your screen as you enter your password.',
    choices: [
      {
        text: 'Ignore them - you\'re probably being paranoid',
        correct: false,
        feedback: 'Trust your instincts. Shoulder surfing is a real threat. Passwords can be memorized by watching someone type.',
      },
      {
        text: 'Shield your screen and ask if you can help them',
        correct: true,
        feedback: 'Good instincts! Politely addressing the situation while protecting your screen is the right balance of security and professionalism.',
      },
      {
        text: 'Continue working but type your password faster',
        correct: false,
        feedback: 'Typing faster doesn\'t prevent observation. The person could still be watching. Address the situation directly.',
      },
    ],
    points: 100,
  },

  // SERVER ROOM SCENARIO
  {
    id: 'server-access',
    type: 'physical',
    title: 'Server Room Access Request',
    context: 'Someone you don\'t recognize approaches you near the server room. They claim to be a contractor here to perform maintenance and ask you to let them in since their access badge "isn\'t working".',
    choices: [
      {
        text: 'Let them in - they look like a legitimate contractor',
        correct: false,
        feedback: 'Never grant server room access based on appearance. Unauthorized access to servers could compromise the entire organization.',
      },
      {
        text: 'Direct them to reception to verify credentials and get proper access',
        correct: true,
        feedback: 'Excellent! All contractors should be verified through proper channels. If their badge isn\'t working, IT or security can help them.',
      },
      {
        text: 'Ask to see their work order before letting them in',
        correct: false,
        feedback: 'Work orders can be faked. You\'re not trained to verify contractor credentials. Let security or IT handle access verification.',
      },
    ],
    points: 100,
  },
]
