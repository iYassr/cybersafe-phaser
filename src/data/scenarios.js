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
    learnMore: {
      title: 'How to Recognize Phishing Emails',
      url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing',
    },
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
    learnMore: {
      title: 'Understanding Malware Attachments',
      url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks',
    },
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
    learnMore: {
      title: 'Business Email Compromise (BEC)',
      url: 'https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise',
    },
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
    learnMore: {
      title: 'Risks of Pirated Software',
      url: 'https://www.cisa.gov/sites/default/files/publications/Malware_Threats_and_Mitigation.pdf',
    },
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
    learnMore: {
      title: 'Tech Support Scams',
      url: 'https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams',
    },
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
    learnMore: {
      title: 'Social Engineering Red Flags',
      url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks',
    },
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
    learnMore: {
      title: 'USB Security Threats',
      url: 'https://www.cisa.gov/news-events/news/using-caution-usb-drives',
    },
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
    learnMore: {
      title: 'Physical Security Awareness',
      url: 'https://www.cisa.gov/topics/physical-security',
    },
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
    learnMore: {
      title: 'Clean Desk Policy',
      url: 'https://www.sans.org/information-security-policy/',
    },
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
    learnMore: {
      title: 'Public Wi-Fi Security',
      url: 'https://www.cisa.gov/news-events/news/securing-wireless-networks',
    },
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
    learnMore: {
      title: 'Protecting Against Visual Hacking',
      url: 'https://www.sans.org/security-awareness-training/resources/',
    },
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
    learnMore: {
      title: 'Data Center Security',
      url: 'https://www.cisa.gov/topics/physical-security',
    },
  },

  // ========== NEW SCENARIOS ==========

  // RANSOMWARE & MALWARE
  {
    id: 'ransomware-popup',
    type: 'device',
    title: 'Ransomware Alert',
    context: 'A popup suddenly appears on your screen: "YOUR FILES HAVE BEEN ENCRYPTED! Pay $500 in Bitcoin within 24 hours or lose all your data forever. Click here to pay now." Your recent files seem inaccessible.',
    choices: [
      {
        text: 'Pay the ransom to recover your files quickly',
        correct: false,
        feedback: 'Never pay ransomware demands! Payment doesn\'t guarantee file recovery and funds criminal operations. Many victims who pay never get their files back.',
      },
      {
        text: 'Disconnect from network and report to IT Security immediately',
        correct: true,
        feedback: 'Excellent! Disconnecting prevents spread to other systems. IT can assess damage, restore from backups, and investigate the infection source.',
      },
      {
        text: 'Try to close the popup and continue working',
        correct: false,
        feedback: 'If ransomware is real, ignoring it won\'t help. If it\'s fake scareware, IT still needs to remove it. Either way, report immediately.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'Ransomware Prevention & Response',
      url: 'https://www.cisa.gov/stopransomware',
    },
  },
  {
    id: 'fake-antivirus',
    type: 'device',
    title: 'Security Scan Alert',
    context: 'While browsing, a professional-looking popup appears: "Windows Defender has detected 47 critical threats! Your banking passwords may be compromised. Click SCAN NOW to remove threats immediately."',
    choices: [
      {
        text: 'Click "Scan Now" to remove the threats',
        correct: false,
        feedback: 'This is a fake antivirus scam! Clicking downloads malware. Real antivirus doesn\'t use browser popups - it runs in your system tray.',
      },
      {
        text: 'Close the browser tab and run your actual antivirus',
        correct: true,
        feedback: 'Correct! Fake security alerts are common scams. Close the tab (don\'t click anything in the popup) and use your real, installed security software.',
      },
      {
        text: 'Call the phone number shown for tech support',
        correct: false,
        feedback: 'Never call numbers in popups! These connect to scammers who will try to install malware or charge for fake "repairs."',
      },
    ],
    points: 100,
    learnMore: {
      title: 'Recognizing Fake Security Alerts',
      url: 'https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams',
    },
  },

  // MOBILE SECURITY
  {
    id: 'mobile-charging',
    type: 'device',
    title: 'Public Charging Station',
    context: 'At a conference, your phone is at 5% battery. You see a free charging station with USB cables. You need your phone for two-factor authentication and conference notes.',
    choices: [
      {
        text: 'Use the provided USB cable - it\'s just charging',
        correct: false,
        feedback: '"Juice jacking" attacks use malicious USB ports to steal data or install malware. USB cables can transfer data, not just power.',
      },
      {
        text: 'Use a power outlet with your own charger or a USB data blocker',
        correct: true,
        feedback: 'Great thinking! Your own charger in a power outlet is safest. USB data blockers (charge-only adapters) also prevent data transfer attacks.',
      },
      {
        text: 'It\'s a conference venue, so it must be safe',
        correct: false,
        feedback: 'Attackers specifically target conferences where many professionals need to charge devices. Never assume public USB ports are safe.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'Juice Jacking Prevention',
      url: 'https://www.fcc.gov/consumers/guides/juice-jacking-how-avoid-it',
    },
  },
  {
    id: 'qr-code-scam',
    type: 'device',
    title: 'QR Code on Flyer',
    context: 'You find a flyer on your desk: "URGENT: New parking policy! Scan QR code to register your vehicle or face towing." The flyer looks official with the company logo.',
    choices: [
      {
        text: 'Scan the QR code immediately to avoid towing',
        correct: false,
        feedback: 'QR codes can lead to phishing sites or malware downloads. Scammers easily copy company logos. Always verify through official channels.',
      },
      {
        text: 'Check with HR or Facilities through official channels first',
        correct: true,
        feedback: 'Perfect! Any legitimate policy change would be announced through official company communications. Verify before scanning unknown QR codes.',
      },
      {
        text: 'The company logo looks real, so it must be legitimate',
        correct: false,
        feedback: 'Logos are easily copied. Attackers create convincing materials. Official communications come through email, intranet, or verified sources.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'QR Code Security Risks',
      url: 'https://www.fbi.gov/contact-us/field-offices/portland/news/fbi-warns-of-malicious-qr-codes',
    },
  },

  // SOCIAL MEDIA & PRIVACY
  {
    id: 'social-media-leak',
    type: 'physical',
    title: 'Social Media Photo',
    context: 'A colleague is excitedly posting photos of the new office space on their personal Instagram. In the background, you notice whiteboards with project details and sticky notes with login credentials visible.',
    choices: [
      {
        text: 'It\'s their personal account, so it\'s not your concern',
        correct: false,
        feedback: 'Social media posts can leak sensitive information visible in backgrounds. Attackers specifically look for such details in public posts.',
      },
      {
        text: 'Politely point out the sensitive information and ask them to remove it',
        correct: true,
        feedback: 'Correct! Kindly helping colleagues understand security risks protects everyone. Most people don\'t realize what\'s visible in their photos.',
      },
      {
        text: 'Report them to HR immediately',
        correct: false,
        feedback: 'While reporting may eventually be needed, a friendly conversation first is usually more effective. They likely didn\'t realize the risk.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'Social Media Security',
      url: 'https://www.cisa.gov/news-events/news/staying-safe-social-networking-sites',
    },
  },
  {
    id: 'linkedin-phishing',
    type: 'email',
    title: 'LinkedIn Recruiter Message',
    context: 'You receive a LinkedIn message: "Hi! I\'m a recruiter from TechGiant Corp. Your profile is impressive! We have a Senior role with 50% salary increase. Please fill out this form with your current salary and SSN for our records."',
    choices: [
      {
        text: 'Fill out the form - TechGiant is a real company',
        correct: false,
        feedback: 'Legitimate recruiters never ask for SSN or current salary via online forms. This is identity theft and salary data harvesting.',
      },
      {
        text: 'Ignore the message or report it as a scam',
        correct: true,
        feedback: 'Excellent! Real recruiters don\'t request sensitive personal information upfront. Report such messages to help protect other users.',
      },
      {
        text: 'Share your work email so they can send official documents',
        correct: false,
        feedback: 'Giving your work email to potential scammers invites more targeted attacks. Verify any recruiter through official company channels first.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'LinkedIn Scam Prevention',
      url: 'https://www.linkedin.com/help/linkedin/answer/a1339632',
    },
  },

  // DATA HANDLING
  {
    id: 'cloud-sharing',
    type: 'device',
    title: 'Quick File Share',
    context: 'A client urgently needs a confidential contract. Your company email blocks large attachments. A colleague suggests: "Just upload it to your personal Google Drive and share the link - it\'s faster!"',
    choices: [
      {
        text: 'Use your personal Google Drive - it\'s encrypted anyway',
        correct: false,
        feedback: 'Personal cloud accounts lack company security controls, audit logs, and compliance features. You could also lose access if you leave the company.',
      },
      {
        text: 'Use approved company file sharing tools or contact IT for help',
        correct: true,
        feedback: 'Correct! Company-approved tools maintain security, compliance, and proper access controls. IT can help with legitimate urgent needs.',
      },
      {
        text: 'Create a new Google account just for work files',
        correct: false,
        feedback: 'Unauthorized accounts still bypass company security policies. Shadow IT creates compliance and security risks regardless of the account.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'Secure File Sharing Best Practices',
      url: 'https://www.nist.gov/blogs/cybersecurity-insights/what-cloud-security',
    },
  },
  {
    id: 'disposal-fail',
    type: 'device',
    title: 'Old Equipment Disposal',
    context: 'IT is replacing old laptops. You see a colleague about to throw their old hard drive in the regular trash. "IT said to dispose of it ourselves and it\'s already wiped," they explain.',
    choices: [
      {
        text: 'Help them throw it away - IT already wiped it',
        correct: false,
        feedback: '"Wiped" drives can often be recovered with forensic tools. Proper disposal requires physical destruction or certified data destruction services.',
      },
      {
        text: 'Suggest returning it to IT for proper secure disposal',
        correct: true,
        feedback: 'Excellent! IT should handle all storage media disposal to ensure proper destruction. Many companies have e-waste and data destruction procedures.',
      },
      {
        text: 'Break the hard drive with a hammer yourself',
        correct: false,
        feedback: 'DIY destruction is unsafe and may not fully destroy data. Professional destruction with certificates of destruction is the proper approach.',
      },
    ],
    points: 100,
    learnMore: {
      title: 'Secure Data Disposal',
      url: 'https://www.nist.gov/publications/guidelines-media-sanitization',
    },
  },

  // ==========================================
  // DATA CENTER SCENARIOS (Level 2)
  // ==========================================
  {
    id: 'dc-server-access',
    type: 'physical',
    title: 'Server Room Access',
    context: 'A technician you don\'t recognize asks to piggyback through the server room door with you. They claim to have forgotten their access badge.',
    choices: [
      {
        text: 'Let them in - they look like they work here',
        correct: false,
        feedback: 'Never allow tailgating in secure areas! Unauthorized access to server rooms can lead to data theft or sabotage.',
      },
      {
        text: 'Refuse and direct them to security to get a temporary badge',
        correct: true,
        feedback: 'Correct! Always enforce access control policies. Legitimate personnel can get temporary access through proper channels.',
      },
      {
        text: 'Ask them some technical questions to verify',
        correct: false,
        feedback: 'Social engineers can fake technical knowledge. Only proper credentials and authorization should grant access.',
      },
    ],
    points: 120,
    learnMore: {
      title: 'Physical Security Controls',
      url: 'https://www.cisa.gov/physical-security',
    },
  },
  {
    id: 'dc-backup-verify',
    type: 'device',
    title: 'Backup Verification',
    context: 'You notice the backup verification log shows "OK" but the timestamp is from 3 weeks ago. The backup admin says "the system is automated, it\'s fine."',
    choices: [
      {
        text: 'Accept the explanation - automation is reliable',
        correct: false,
        feedback: 'Automated systems can fail silently. Regular verification is critical for disaster recovery readiness.',
      },
      {
        text: 'Report to management and request a manual backup test',
        correct: true,
        feedback: 'Excellent! Backups must be regularly tested. Untested backups are as dangerous as no backups.',
      },
      {
        text: 'Run a backup yourself to be safe',
        correct: false,
        feedback: 'Good instinct, but unauthorized actions could disrupt production. Proper escalation is the right approach.',
      },
    ],
    points: 120,
    learnMore: {
      title: 'Backup Best Practices',
      url: 'https://www.cisa.gov/backup-data',
    },
  },
  {
    id: 'dc-network-sniffing',
    type: 'network',
    title: 'Suspicious Network Activity',
    context: 'Network monitoring shows unusual traffic patterns - large data transfers happening at 3 AM to an unknown external IP address.',
    choices: [
      {
        text: 'Ignore it - could be automated updates',
        correct: false,
        feedback: 'Suspicious network activity should never be ignored. This could indicate data exfiltration.',
      },
      {
        text: 'Immediately isolate the affected segment and escalate to incident response',
        correct: true,
        feedback: 'Perfect response! Quick containment and proper escalation is critical during potential breaches.',
      },
      {
        text: 'Wait and monitor to gather more evidence',
        correct: false,
        feedback: 'While evidence is important, active data exfiltration requires immediate containment.',
      },
    ],
    points: 120,
    learnMore: {
      title: 'Network Intrusion Detection',
      url: 'https://www.cisa.gov/network-security',
    },
  },
  {
    id: 'dc-cable-label',
    type: 'device',
    title: 'Unlabeled Equipment',
    context: 'You find an unlabeled network device plugged into the server rack. It has blinking lights and appears active but isn\'t documented.',
    choices: [
      {
        text: 'Unplug it immediately - it\'s not documented',
        correct: false,
        feedback: 'Unplugging unknown devices could disrupt critical systems. Document and escalate first.',
      },
      {
        text: 'Leave it alone - someone probably knows about it',
        correct: false,
        feedback: 'Undocumented equipment is a security risk. It could be a rogue device placed by an attacker.',
      },
      {
        text: 'Document its location and connections, then report to security team',
        correct: true,
        feedback: 'Correct approach! Proper documentation and escalation helps investigate without disrupting operations.',
      },
    ],
    points: 120,
    learnMore: {
      title: 'Asset Management Security',
      url: 'https://www.nist.gov/cyberframework',
    },
  },
  {
    id: 'dc-visitor-escort',
    type: 'physical',
    title: 'Unescorted Vendor',
    context: 'A vendor is walking alone through the data center. They show you a visitor badge but have no escort. They say their escort "had to step out."',
    choices: [
      {
        text: 'Let them continue - they have a visitor badge',
        correct: false,
        feedback: 'Visitors must always be escorted in secure areas, regardless of badge status.',
      },
      {
        text: 'Stay with them until their escort returns or escort them to the security desk',
        correct: true,
        feedback: 'Excellent! Escort policies exist for good reason. You should either escort them or get security involved.',
      },
      {
        text: 'Ask them to wait in the lobby on their own',
        correct: false,
        feedback: 'Leaving a visitor unattended, even temporarily, creates a security gap.',
      },
    ],
    points: 120,
    learnMore: {
      title: 'Visitor Management',
      url: 'https://www.cisa.gov/physical-security',
    },
  },
  {
    id: 'dc-maintenance-window',
    type: 'device',
    title: 'Emergency Maintenance',
    context: 'A caller claims to be from your hosting provider and needs immediate access to push an "emergency security patch" outside the maintenance window.',
    choices: [
      {
        text: 'Allow it - security patches are important',
        correct: false,
        feedback: 'Never bypass change management for unverified requests. This is a common social engineering tactic.',
      },
      {
        text: 'Refuse and verify through official channels before any action',
        correct: true,
        feedback: 'Correct! Always verify emergency requests through known contacts. Attackers often create false urgency.',
      },
      {
        text: 'Grant limited access to see what they do',
        correct: false,
        feedback: 'Any unauthorized access is a risk. Verification must come before any access is granted.',
      },
    ],
    points: 120,
    learnMore: {
      title: 'Change Management Security',
      url: 'https://www.sans.org/security-resources/',
    },
  },

  // ==========================================
  // EXECUTIVE FLOOR SCENARIOS (Level 3)
  // ==========================================
  {
    id: 'exec-ceo-fraud-advanced',
    type: 'email',
    title: 'Sophisticated CEO Fraud',
    context: 'An email from "the CEO" requests an urgent wire transfer of $250,000 to finalize an acquisition. The email references real ongoing negotiations you\'ve heard about.',
    choices: [
      {
        text: 'Process the transfer - the details are accurate',
        correct: false,
        feedback: 'Attackers research targets thoroughly. Real details don\'t verify authenticity - verification procedures do.',
      },
      {
        text: 'Call the CEO directly on a known number to verify',
        correct: true,
        feedback: 'Perfect! Always verify large financial requests through a separate, trusted communication channel.',
      },
      {
        text: 'Email back asking for confirmation',
        correct: false,
        feedback: 'If the email is compromised, the attacker will just confirm. Use a different channel.',
      },
    ],
    points: 150,
    learnMore: {
      title: 'Business Email Compromise',
      url: 'https://www.fbi.gov/scams-and-safety/common-scams-and-crimes/business-email-compromise',
    },
  },
  {
    id: 'exec-board-presentation',
    type: 'device',
    title: 'Board Meeting Security',
    context: 'Before a board meeting, someone offers to help set up by plugging in a USB drive with "updated presentations." They claim to be from IT support.',
    choices: [
      {
        text: 'Allow it - IT often helps with presentations',
        correct: false,
        feedback: 'Unknown USB devices in executive areas are high-risk. This could be an attempt to install malware or steal data.',
      },
      {
        text: 'Decline and verify with IT department directly',
        correct: true,
        feedback: 'Excellent! Always verify IT support requests, especially in sensitive areas like boardrooms.',
      },
      {
        text: 'Let them plug it in but watch what they do',
        correct: false,
        feedback: 'Malware can install instantly. Watching won\'t protect against hidden attacks.',
      },
    ],
    points: 150,
    learnMore: {
      title: 'USB Security Threats',
      url: 'https://www.cisa.gov/usb-security',
    },
  },
  {
    id: 'exec-assistant-request',
    type: 'phone',
    title: 'Executive Assistant Impersonation',
    context: 'A caller claims to be calling on behalf of the CFO, requesting employee salary information for a "compensation review." They sound professional and urgent.',
    choices: [
      {
        text: 'Provide the information - it sounds legitimate',
        correct: false,
        feedback: 'Salary data is confidential. Requests for sensitive data require verified authorization.',
      },
      {
        text: 'Decline and tell them to have the CFO request through proper channels',
        correct: true,
        feedback: 'Correct! Sensitive data requests must go through established procedures, regardless of claimed authority.',
      },
      {
        text: 'Ask for their employee ID to verify',
        correct: false,
        feedback: 'Employee IDs can be researched or guessed. This doesn\'t properly verify the request.',
      },
    ],
    points: 150,
    learnMore: {
      title: 'Pretexting Attacks',
      url: 'https://www.cisa.gov/sites/default/files/publications/socialengineering.pdf',
    },
  },
  {
    id: 'exec-merger-leak',
    type: 'physical',
    title: 'Confidential Documents',
    context: 'You find merger documents left at the printer. They\'re marked "CONFIDENTIAL" and relate to an unannounced acquisition.',
    choices: [
      {
        text: 'Take a photo for your records - this could be valuable',
        correct: false,
        feedback: 'Photographing confidential documents is a serious policy violation and potentially illegal.',
      },
      {
        text: 'Leave them there - someone will collect them',
        correct: false,
        feedback: 'Confidential documents left unsecured can be seen by unauthorized people or visitors.',
      },
      {
        text: 'Secure them and return to the document owner or shred them',
        correct: true,
        feedback: 'Correct! Confidential documents should be immediately secured and returned to the owner or properly disposed.',
      },
    ],
    points: 150,
    learnMore: {
      title: 'Information Classification',
      url: 'https://www.nist.gov/privacy-framework',
    },
  },
  {
    id: 'exec-competitor-spy',
    type: 'email',
    title: 'Competitive Intelligence',
    context: 'You receive an email from a "market researcher" offering payment for answering questions about your company\'s upcoming product launches.',
    choices: [
      {
        text: 'Participate - extra income is always welcome',
        correct: false,
        feedback: 'This is likely competitive intelligence gathering. Sharing internal information could be corporate espionage.',
      },
      {
        text: 'Report the email to security and delete it',
        correct: true,
        feedback: 'Perfect! This is a social engineering attempt. Reporting helps protect the company from information leaks.',
      },
      {
        text: 'Respond asking for more details about the research',
        correct: false,
        feedback: 'Engaging with suspicious requests can provide attackers with information or lead to more targeted attacks.',
      },
    ],
    points: 150,
    learnMore: {
      title: 'Corporate Espionage Prevention',
      url: 'https://www.fbi.gov/investigate/counterintelligence',
    },
  },
  {
    id: 'exec-vip-visitor',
    type: 'physical',
    title: 'VIP Access Request',
    context: 'Someone claiming to be an important investor arrives without an appointment, demanding immediate access to meet with the CEO. They seem impatient and mention large investment amounts.',
    choices: [
      {
        text: 'Accommodate them - we don\'t want to offend investors',
        correct: false,
        feedback: 'Pressure and urgency are social engineering tactics. Real VIPs understand security procedures.',
      },
      {
        text: 'Follow standard visitor procedures regardless of claimed status',
        correct: true,
        feedback: 'Excellent! Security procedures apply to everyone. Legitimate visitors will understand and comply.',
      },
      {
        text: 'Give them a visitor badge and let them wait in the lobby',
        correct: false,
        feedback: 'Visitor badges should only be issued after proper verification and authorization.',
      },
    ],
    points: 150,
    learnMore: {
      title: 'Executive Protection',
      url: 'https://www.cisa.gov/physical-security',
    },
  },
]
