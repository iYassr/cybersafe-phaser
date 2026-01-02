export const translations = {
  en: {
    // Menu
    title: 'CYBERSAFE',
    subtitle: 'OFFICE',
    tagline: 'Security Awareness Training',
    instructions: [
      'Navigate the office and identify security threats.',
      'Make smart decisions to protect your organization.',
      '',
      'Controls:',
      'WASD / Arrow Keys - Move',
      'SPACE / E - Interact',
    ],
    startButton: 'START TRAINING',
    highScore: 'High Score',
    language: 'Language',

    // HUD
    score: 'Score',
    progress: 'Progress',
    hint: 'Find glowing objects',

    // Room labels
    serverRoom: 'SERVER ROOM',
    breakRoom: 'BREAK ROOM',
    meetingRoom: 'MEETING ROOM',
    mainOffice: 'MAIN OFFICE',
    reception: 'RECEPTION',

    // Interaction
    interactPrompt: 'Press SPACE to interact',

    // Results
    trainingComplete: 'Training Complete!',
    finalScore: 'Final Score',
    scenariosCompleted: 'Scenarios Completed',
    securityTips: 'Security Tips',
    playAgain: 'Play Again',
    backToMenu: 'Back to Menu',

    // Scenario UI
    correct: 'Correct!',
    incorrect: 'Incorrect',
    continue: 'Continue',
    learnMore: 'Learn More',

    // Scenarios
    scenarios: {
      'phishing-email': {
        title: 'Suspicious Email',
        description: 'You received an email claiming to be from IT Support asking you to reset your password immediately by clicking a link. The email address is support@1t-helpdesk.com.',
        choices: [
          { text: 'Click the link and reset password', correct: false, feedback: 'Never click links in suspicious emails! The domain "1t-helpdesk" uses "1" instead of "I" - a common phishing trick.' },
          { text: 'Report to IT Security', correct: true, feedback: 'Excellent! Always report suspicious emails. IT will verify if it\'s legitimate and warn others.' },
          { text: 'Reply asking if it\'s real', correct: false, feedback: 'Never reply to suspicious emails - this confirms your email is active to attackers.' },
          { text: 'Delete and ignore', correct: false, feedback: 'While not clicking is good, you should report it so IT can protect others.' },
        ],
      },
      'invoice-malware': {
        title: 'Invoice Attachment',
        description: 'An email from "accounting@vendor-invoice.net" contains an attachment named "Invoice_2024.exe" requesting urgent payment.',
        choices: [
          { text: 'Open the attachment', correct: false, feedback: '.EXE files are programs, not documents! This is almost certainly malware.' },
          { text: 'Forward to your manager', correct: false, feedback: 'Don\'t spread potential malware. Report to IT Security instead.' },
          { text: 'Report to IT Security', correct: true, feedback: 'Correct! Executable attachments from unknown senders are a major red flag.' },
          { text: 'Reply requesting a PDF instead', correct: false, feedback: 'Don\'t engage with suspicious senders - report to IT instead.' },
        ],
      },
      'ceo-fraud': {
        title: 'Urgent CEO Request',
        description: 'You receive an email appearing to be from the CEO: "I need you to purchase $500 in gift cards for a client. Keep this confidential. Send me the codes ASAP."',
        choices: [
          { text: 'Buy the gift cards immediately', correct: false, feedback: 'This is CEO fraud/Business Email Compromise. Executives never request gift cards via email.' },
          { text: 'Verify by calling the CEO directly', correct: true, feedback: 'Always verify unusual requests through a different channel. This is a common scam.' },
          { text: 'Email back to confirm', correct: false, feedback: 'The attacker controls the email - they\'ll just confirm. Use phone or in-person verification.' },
          { text: 'Ask a coworker what to do', correct: false, feedback: 'While seeking advice is okay, you should verify directly with the supposed sender.' },
        ],
      },
      'software-download': {
        title: 'Free Software',
        description: 'You find a website offering a free "premium" version of expensive software your team needs. It requires disabling antivirus to install.',
        choices: [
          { text: 'Download and install it', correct: false, feedback: 'Pirated software often contains malware. Disabling antivirus is a huge red flag!' },
          { text: 'Request the software through IT', correct: true, feedback: 'Correct! Always use official channels for software. IT can evaluate legitimate options.' },
          { text: 'Download but scan with antivirus first', correct: false, feedback: 'The site asked you to disable antivirus - this indicates malware that evades detection.' },
          { text: 'Share the link with your team', correct: false, feedback: 'Never share suspicious software sources - you could compromise the entire organization.' },
        ],
      },
      'tech-support-scam': {
        title: 'Tech Support Call',
        description: 'Someone calls claiming to be from "Microsoft Security" saying your computer is infected and they need remote access to fix it.',
        choices: [
          { text: 'Give them remote access', correct: false, feedback: 'Microsoft never makes unsolicited calls! This is a tech support scam.' },
          { text: 'Hang up immediately', correct: true, feedback: 'Correct! Legitimate tech companies don\'t cold-call about security issues.' },
          { text: 'Ask for their employee ID', correct: false, feedback: 'Scammers will provide fake IDs. The call itself is the red flag - hang up.' },
          { text: 'Give them your IT department\'s number', correct: false, feedback: 'Don\'t provide any information to scammers - just hang up.' },
        ],
      },
      'vendor-call': {
        title: 'Vendor Information Request',
        description: 'A caller claims to be from a vendor your company uses, asking to verify your account by confirming your employee ID and department.',
        choices: [
          { text: 'Provide the information', correct: false, feedback: 'Never verify your identity to incoming callers - this could be social engineering.' },
          { text: 'Call the vendor back using official number', correct: true, feedback: 'Excellent! Always verify by calling back using numbers from official sources.' },
          { text: 'Transfer to your manager', correct: false, feedback: 'Don\'t pass social engineering attempts around - verify legitimacy first.' },
          { text: 'Ask them security questions', correct: false, feedback: 'Attackers may have researched answers. Call back using verified numbers instead.' },
        ],
      },
      'usb-drive': {
        title: 'Found USB Drive',
        description: 'You find a USB drive in the parking lot labeled "Employee Salaries 2024". What do you do?',
        choices: [
          { text: 'Plug it in to find the owner', correct: false, feedback: 'USB drops are a classic attack! Malware can auto-execute when plugged in.' },
          { text: 'Turn it in to IT Security', correct: true, feedback: 'Correct! IT can safely examine it in an isolated environment.' },
          { text: 'Plug it into a non-work computer', correct: false, feedback: 'The malware could still steal data or spread to your home network.' },
          { text: 'Throw it away', correct: false, feedback: 'Better than plugging it in, but IT should examine it to assess the threat.' },
        ],
      },
      'tailgating': {
        title: 'Door Access',
        description: 'Someone in a delivery uniform asks you to hold the secure door open for them because "they forgot their badge."',
        choices: [
          { text: 'Hold the door open', correct: false, feedback: 'Tailgating is a common physical security breach. Always verify access.' },
          { text: 'Direct them to reception', correct: true, feedback: 'Correct! Visitors should always check in through proper channels.' },
          { text: 'Ask to see their badge', correct: false, feedback: 'They said they forgot it - directing to reception is the proper procedure.' },
          { text: 'Let them in but report it later', correct: false, feedback: 'By then, damage could be done. Never let unauthorized people into secure areas.' },
        ],
      },
      'clean-desk': {
        title: 'Sensitive Documents',
        description: 'You notice a coworker has left sensitive client documents visible on their desk and their computer unlocked while at lunch.',
        choices: [
          { text: 'Ignore it - not your business', correct: false, feedback: 'Security is everyone\'s responsibility. Unprotected data is a serious risk.' },
          { text: 'Lock their computer and cover documents', correct: true, feedback: 'Correct! Help protect sensitive information and remind them of clean desk policy.' },
          { text: 'Take photos as evidence', correct: false, feedback: 'This creates more copies of sensitive data. Just secure it and inform them.' },
          { text: 'Report them to HR immediately', correct: false, feedback: 'First secure the data, then have a friendly conversation. It may be an honest mistake.' },
        ],
      },
      'public-wifi': {
        title: 'Public WiFi',
        description: 'You\'re working remotely at a coffee shop and need to access company email. The free WiFi requires no password.',
        choices: [
          { text: 'Connect and access email normally', correct: false, feedback: 'Open WiFi can be monitored by attackers who can steal your credentials.' },
          { text: 'Use your phone\'s hotspot or VPN', correct: true, feedback: 'Correct! VPN encrypts your traffic. Phone hotspot is also more secure.' },
          { text: 'Only access non-sensitive sites', correct: false, feedback: 'Even "non-sensitive" browsing can expose session cookies and passwords.' },
          { text: 'Connect but don\'t enter passwords', correct: false, feedback: 'Saved sessions and cookies can still be hijacked on insecure networks.' },
        ],
      },
      'shoulder-surfing': {
        title: 'Shoulder Surfing',
        description: 'While entering your password at a coffee shop, you notice someone nearby seems to be watching your screen intently.',
        choices: [
          { text: 'Continue - they\'re probably just curious', correct: false, feedback: 'Shoulder surfing is a real threat. Protect your screen and credentials.' },
          { text: 'Shield your screen and use privacy filter', correct: true, feedback: 'Correct! Physical privacy is important. Consider a privacy screen filter.' },
          { text: 'Type faster so they can\'t see', correct: false, feedback: 'Determined attackers can still observe. Shield your screen instead.' },
          { text: 'Confront them aggressively', correct: false, feedback: 'This could escalate. Simply protect your screen and move if needed.' },
        ],
      },
      'server-access': {
        title: 'Server Room Access',
        description: 'A technician you don\'t recognize asks you to let them into the server room because "the IT manager sent them."',
        choices: [
          { text: 'Let them in - they look professional', correct: false, feedback: 'Appearance means nothing. Unauthorized server access could be catastrophic.' },
          { text: 'Verify with IT manager first', correct: true, feedback: 'Always verify! A quick call can prevent a major security breach.' },
          { text: 'Ask for their company ID', correct: false, feedback: 'IDs can be faked. Direct verification with IT manager is essential.' },
          { text: 'Let them in but stay with them', correct: false, feedback: 'You shouldn\'t let unauthorized people in at all - verify first.' },
        ],
      },
      'ransomware-popup': {
        title: 'Ransomware Alert',
        description: 'A popup appears: "YOUR FILES HAVE BEEN ENCRYPTED! Pay $500 in Bitcoin within 24 hours." Your files seem inaccessible.',
        choices: [
          { text: 'Pay the ransom to recover files', correct: false, feedback: 'Never pay ransomware! Payment doesn\'t guarantee recovery and funds criminals.' },
          { text: 'Disconnect and report to IT immediately', correct: true, feedback: 'Excellent! Disconnecting prevents spread. IT can restore from backups.' },
          { text: 'Close popup and continue working', correct: false, feedback: 'Ignoring won\'t help. Whether real or fake, IT needs to handle it.' },
        ],
      },
      'fake-antivirus': {
        title: 'Security Scan Alert',
        description: 'A popup says "Windows Defender detected 47 threats! Click SCAN NOW to remove immediately."',
        choices: [
          { text: 'Click "Scan Now" to remove threats', correct: false, feedback: 'This is a scam! Real antivirus doesn\'t use browser popups.' },
          { text: 'Close browser and run actual antivirus', correct: true, feedback: 'Correct! Close the tab without clicking anything in the popup.' },
          { text: 'Call the phone number shown', correct: false, feedback: 'Never call popup numbers! They connect to scammers.' },
        ],
      },
      'mobile-charging': {
        title: 'Public Charging Station',
        description: 'Your phone is at 5% at a conference. A free USB charging station is available.',
        choices: [
          { text: 'Use the provided USB cable', correct: false, feedback: '"Juice jacking" attacks steal data through USB. Cables transfer more than power.' },
          { text: 'Use power outlet with your own charger', correct: true, feedback: 'Great! Your own charger or a USB data blocker prevents attacks.' },
          { text: 'It\'s a conference, so it\'s safe', correct: false, feedback: 'Attackers target conferences specifically. Never assume public USB is safe.' },
        ],
      },
      'qr-code-scam': {
        title: 'QR Code on Flyer',
        description: 'A flyer says "URGENT: Scan QR to register vehicle or face towing." It has the company logo.',
        choices: [
          { text: 'Scan immediately to avoid towing', correct: false, feedback: 'QR codes can lead to phishing sites. Logos are easily copied.' },
          { text: 'Verify with HR/Facilities first', correct: true, feedback: 'Perfect! Official policy changes come through verified channels.' },
          { text: 'The logo looks real, so it\'s legitimate', correct: false, feedback: 'Logos are easily faked. Always verify through official sources.' },
        ],
      },
      'social-media-leak': {
        title: 'Social Media Photo',
        description: 'A colleague posts office photos. You notice whiteboards with credentials visible in the background.',
        choices: [
          { text: 'It\'s their personal account', correct: false, feedback: 'Background info in photos is a real security risk attackers exploit.' },
          { text: 'Politely ask them to remove it', correct: true, feedback: 'Correct! Help colleagues understand what\'s visible in their photos.' },
          { text: 'Report to HR immediately', correct: false, feedback: 'A friendly conversation first is more effective. They likely didn\'t realize.' },
        ],
      },
      'linkedin-phishing': {
        title: 'LinkedIn Recruiter Message',
        description: 'A recruiter messages asking for your SSN and current salary "for their records."',
        choices: [
          { text: 'Fill out the form', correct: false, feedback: 'Real recruiters never ask for SSN via online forms. This is identity theft.' },
          { text: 'Ignore or report as scam', correct: true, feedback: 'Excellent! Real recruiters don\'t request sensitive info upfront.' },
          { text: 'Share work email for documents', correct: false, feedback: 'Don\'t give scammers your work email - verify through official channels.' },
        ],
      },
      'cloud-sharing': {
        title: 'Quick File Share',
        description: 'Company email blocks large files. A colleague suggests using personal Google Drive.',
        choices: [
          { text: 'Use personal Google Drive', correct: false, feedback: 'Personal accounts lack company security controls and compliance features.' },
          { text: 'Use approved company tools or ask IT', correct: true, feedback: 'Correct! Company tools maintain security and proper access controls.' },
          { text: 'Create a new account for work', correct: false, feedback: 'Unauthorized accounts still bypass security policies.' },
        ],
      },
      'disposal-fail': {
        title: 'Old Equipment Disposal',
        description: 'A colleague is throwing an old hard drive in regular trash. "IT said it\'s wiped."',
        choices: [
          { text: 'Help throw it away', correct: false, feedback: '"Wiped" drives can be recovered. Proper disposal needs physical destruction.' },
          { text: 'Return to IT for secure disposal', correct: true, feedback: 'Excellent! IT handles storage media to ensure proper destruction.' },
          { text: 'Break it with a hammer', correct: false, feedback: 'DIY destruction is unsafe and may not fully destroy data.' },
        ],
      },
    },

    // Level Select
    selectLevel: 'SELECT LEVEL',
    level1Name: 'Main Office',
    level1Subtitle: 'Beginner',
    level1Desc: 'Learn the basics of cybersecurity awareness',
    level2Name: 'Data Center',
    level2Subtitle: 'Intermediate',
    level2Desc: 'Protect critical infrastructure',
    level3Name: 'Executive Floor',
    level3Subtitle: 'Advanced',
    level3Desc: 'Defend against targeted attacks',
    scenarios: 'scenarios',
    bestScore: 'Best',
    unlockRequirement: 'Complete previous\nlevel with 70%+ score',
    levelLocked: 'Locked',

    // Data Center room labels
    serverHall: 'SERVER HALL',
    cooling: 'COOLING',
    network: 'NETWORK OPS',
    securityStation: 'SECURITY STATION',

    // Executive Floor room labels
    ceoOffice: 'CEO OFFICE',
    boardroom: 'BOARDROOM',
    executiveAssistant: 'EXECUTIVE ASSISTANT',
    vipReception: 'VIP RECEPTION',

    // Story mode
    skip: 'Skip >>',
    clickToContinue: 'Click to continue...',
    storyCharacterName: 'Security Officer Chen',
    story1Intro1: "Welcome to Acme Corp! I'm Officer Chen, your Security Awareness Champion mentor.",
    story1Intro2: "Today is your first day in the Main Office. You'll learn to spot common security threats.",
    story1Intro3: "Remember: cybersecurity is everyone's responsibility. Stay vigilant!",
    story1Intro4: "Explore the office and interact with glowing objects to handle security scenarios.",
    story1Outro1: "Excellent work on your first day! You've shown great security awareness.",
    story1Outro2: "But there's more to protect. Strange activity has been detected in the Data Center...",
    story2Intro1: "We've detected unusual network activity. The Data Center needs your attention.",
    story2Intro2: "This area houses our critical infrastructure. The stakes are higher here.",
    story2Intro3: "Physical security and access control are paramount. Trust but verify.",
    story2Outro1: "The infrastructure is secure. But our investigation revealed a deeper threat...",
    story2Outro2: "Intelligence suggests our executives are being targeted. Head to the Executive Floor.",
    story3Intro1: "Welcome to the Executive Floor. This is where high-value targets work.",
    story3Intro2: "Attackers specifically target executives with sophisticated social engineering.",
    story3Intro3: "CEO fraud, corporate espionage, insider threats... You must be prepared for anything.",
    story3Outro1: "Outstanding! You've protected Acme Corp from top to bottom.",
    story3Outro2: "You are now officially our Security Awareness Champion. The organization is safer because of you!",
    story3Outro3: "Remember: security is a continuous journey, not a destination. Stay vigilant!",
  },

  ar: {
    // Menu
    title: 'الأمن السيبراني',
    subtitle: 'المكتب',
    tagline: 'تدريب التوعية الأمنية',
    instructions: [
      'تنقل في المكتب وحدد التهديدات الأمنية.',
      'اتخذ قرارات ذكية لحماية مؤسستك.',
      '',
      'التحكم:',
      'WASD / مفاتيح الأسهم - التحرك',
      'SPACE / E - التفاعل',
    ],
    startButton: 'ابدأ التدريب',
    highScore: 'أعلى نتيجة',
    language: 'اللغة',

    // HUD
    score: 'النتيجة',
    progress: 'التقدم',
    hint: 'ابحث عن الأشياء المتوهجة',

    // Room labels
    serverRoom: 'غرفة الخوادم',
    breakRoom: 'غرفة الاستراحة',
    meetingRoom: 'غرفة الاجتماعات',
    mainOffice: 'المكتب الرئيسي',
    reception: 'الاستقبال',

    // Interaction
    interactPrompt: 'اضغط SPACE للتفاعل',

    // Results
    trainingComplete: 'اكتمل التدريب!',
    finalScore: 'النتيجة النهائية',
    scenariosCompleted: 'السيناريوهات المكتملة',
    securityTips: 'نصائح أمنية',
    playAgain: 'العب مرة أخرى',
    backToMenu: 'العودة للقائمة',

    // Scenario UI
    correct: 'صحيح!',
    incorrect: 'خطأ',
    continue: 'متابعة',
    learnMore: 'اعرف المزيد',

    // Scenarios
    scenarios: {
      'phishing-email': {
        title: 'بريد إلكتروني مشبوه',
        description: 'تلقيت بريدًا إلكترونيًا يدعي أنه من دعم تقنية المعلومات يطلب منك إعادة تعيين كلمة المرور فورًا بالنقر على رابط. عنوان البريد هو support@1t-helpdesk.com.',
        choices: [
          { text: 'انقر على الرابط وأعد تعيين كلمة المرور', correct: false, feedback: 'لا تنقر أبدًا على الروابط في رسائل البريد المشبوهة! النطاق "1t-helpdesk" يستخدم "1" بدلاً من "I" - خدعة تصيد شائعة.' },
          { text: 'أبلغ قسم أمن المعلومات', correct: true, feedback: 'ممتاز! أبلغ دائمًا عن رسائل البريد المشبوهة. سيتحقق قسم تقنية المعلومات من شرعيتها وينبه الآخرين.' },
          { text: 'رد واسأل إذا كان حقيقيًا', correct: false, feedback: 'لا ترد أبدًا على رسائل البريد المشبوهة - هذا يؤكد للمهاجمين أن بريدك نشط.' },
          { text: 'احذف وتجاهل', correct: false, feedback: 'عدم النقر جيد، لكن يجب الإبلاغ حتى يتمكن قسم تقنية المعلومات من حماية الآخرين.' },
        ],
      },
      'invoice-malware': {
        title: 'مرفق فاتورة',
        description: 'بريد إلكتروني من "accounting@vendor-invoice.net" يحتوي على مرفق باسم "Invoice_2024.exe" يطلب دفعًا عاجلاً.',
        choices: [
          { text: 'افتح المرفق', correct: false, feedback: 'ملفات .EXE هي برامج وليست مستندات! هذا بالتأكيد برنامج ضار.' },
          { text: 'أرسله لمديرك', correct: false, feedback: 'لا تنشر البرامج الضارة المحتملة. أبلغ قسم أمن المعلومات بدلاً من ذلك.' },
          { text: 'أبلغ قسم أمن المعلومات', correct: true, feedback: 'صحيح! المرفقات التنفيذية من مرسلين مجهولين هي علامة خطر كبيرة.' },
          { text: 'رد واطلب ملف PDF بدلاً منه', correct: false, feedback: 'لا تتفاعل مع المرسلين المشبوهين - أبلغ قسم تقنية المعلومات بدلاً من ذلك.' },
        ],
      },
      'ceo-fraud': {
        title: 'طلب عاجل من المدير التنفيذي',
        description: 'تلقيت بريدًا يبدو أنه من المدير التنفيذي: "أحتاج منك شراء بطاقات هدايا بقيمة 500 دولار لعميل. حافظ على السرية. أرسل لي الأكواد فورًا."',
        choices: [
          { text: 'اشترِ بطاقات الهدايا فورًا', correct: false, feedback: 'هذا احتيال انتحال شخصية المدير التنفيذي. المديرون لا يطلبون بطاقات هدايا عبر البريد الإلكتروني.' },
          { text: 'تحقق بالاتصال بالمدير التنفيذي مباشرة', correct: true, feedback: 'تحقق دائمًا من الطلبات غير العادية عبر قناة مختلفة. هذه عملية احتيال شائعة.' },
          { text: 'رد بالبريد للتأكيد', correct: false, feedback: 'المهاجم يتحكم في البريد - سيؤكد فقط. استخدم الهاتف أو التحقق الشخصي.' },
          { text: 'اسأل زميلًا ماذا تفعل', correct: false, feedback: 'طلب النصيحة جيد، لكن يجب التحقق مباشرة مع المرسل المفترض.' },
        ],
      },
      'software-download': {
        title: 'برنامج مجاني',
        description: 'وجدت موقعًا يقدم نسخة "مميزة" مجانية من برنامج باهظ الثمن يحتاجه فريقك. يتطلب تعطيل برنامج مكافحة الفيروسات للتثبيت.',
        choices: [
          { text: 'حمّل وثبّت', correct: false, feedback: 'البرامج المقرصنة غالبًا تحتوي على برامج ضارة. تعطيل مكافحة الفيروسات علامة خطر كبيرة!' },
          { text: 'اطلب البرنامج من خلال قسم تقنية المعلومات', correct: true, feedback: 'صحيح! استخدم دائمًا القنوات الرسمية للبرامج. يمكن لقسم تقنية المعلومات تقييم الخيارات المشروعة.' },
          { text: 'حمّل لكن افحص بمكافحة الفيروسات أولاً', correct: false, feedback: 'الموقع طلب تعطيل مكافحة الفيروسات - هذا يشير إلى برامج ضارة تتجنب الكشف.' },
          { text: 'شارك الرابط مع فريقك', correct: false, feedback: 'لا تشارك مصادر البرامج المشبوهة - قد تعرض المؤسسة بأكملها للخطر.' },
        ],
      },
      'tech-support-scam': {
        title: 'مكالمة دعم فني',
        description: 'شخص يتصل مدعيًا أنه من "أمن مايكروسوفت" يقول أن جهازك مصاب ويحتاج وصولاً عن بُعد لإصلاحه.',
        choices: [
          { text: 'أعطه الوصول عن بُعد', correct: false, feedback: 'مايكروسوفت لا تجري مكالمات غير مرغوبة! هذه عملية احتيال دعم فني.' },
          { text: 'أغلق الخط فورًا', correct: true, feedback: 'صحيح! الشركات التقنية المشروعة لا تتصل بشكل غير مرغوب بشأن مشاكل أمنية.' },
          { text: 'اطلب رقم الموظف', correct: false, feedback: 'المحتالون سيقدمون أرقامًا مزيفة. المكالمة نفسها هي العلامة الحمراء - أغلق الخط.' },
          { text: 'أعطه رقم قسم تقنية المعلومات', correct: false, feedback: 'لا تقدم أي معلومات للمحتالين - فقط أغلق الخط.' },
        ],
      },
      'vendor-call': {
        title: 'طلب معلومات من مورد',
        description: 'متصل يدعي أنه من مورد تتعامل معه شركتك، يطلب التحقق من حسابك بتأكيد رقم الموظف والقسم.',
        choices: [
          { text: 'قدم المعلومات', correct: false, feedback: 'لا تتحقق من هويتك للمتصلين - قد يكون هذا هندسة اجتماعية.' },
          { text: 'اتصل بالمورد باستخدام الرقم الرسمي', correct: true, feedback: 'ممتاز! تحقق دائمًا بالاتصال باستخدام أرقام من مصادر رسمية.' },
          { text: 'حوّل لمديرك', correct: false, feedback: 'لا تمرر محاولات الهندسة الاجتماعية - تحقق من الشرعية أولاً.' },
          { text: 'اسأله أسئلة أمنية', correct: false, feedback: 'المهاجمون قد يكونون بحثوا عن الإجابات. اتصل باستخدام أرقام موثقة بدلاً من ذلك.' },
        ],
      },
      'usb-drive': {
        title: 'فلاش USB مفقود',
        description: 'وجدت فلاش USB في موقف السيارات مكتوب عليه "رواتب الموظفين 2024". ماذا تفعل؟',
        choices: [
          { text: 'وصّله لمعرفة المالك', correct: false, feedback: 'إسقاط USB هجوم كلاسيكي! البرامج الضارة يمكن أن تعمل تلقائيًا عند التوصيل.' },
          { text: 'سلّمه لقسم أمن المعلومات', correct: true, feedback: 'صحيح! يمكن لقسم تقنية المعلومات فحصه بأمان في بيئة معزولة.' },
          { text: 'وصّله بجهاز غير العمل', correct: false, feedback: 'البرامج الضارة يمكن أن تسرق البيانات أو تنتشر لشبكتك المنزلية.' },
          { text: 'ارمِه', correct: false, feedback: 'أفضل من توصيله، لكن يجب على قسم تقنية المعلومات فحصه لتقييم التهديد.' },
        ],
      },
      'tailgating': {
        title: 'الوصول للباب',
        description: 'شخص بزي توصيل يطلب منك إبقاء الباب الآمن مفتوحًا له لأنه "نسي بطاقته".',
        choices: [
          { text: 'افتح الباب له', correct: false, feedback: 'التسلل خلف الآخرين اختراق أمني شائع. تحقق دائمًا من الوصول.' },
          { text: 'وجّهه للاستقبال', correct: true, feedback: 'صحيح! الزوار يجب أن يسجلوا دائمًا من خلال القنوات المناسبة.' },
          { text: 'اطلب رؤية بطاقته', correct: false, feedback: 'قال أنه نسيها - توجيهه للاستقبال هو الإجراء الصحيح.' },
          { text: 'دعه يدخل لكن أبلغ لاحقًا', correct: false, feedback: 'بحلول ذلك الوقت، قد يحدث الضرر. لا تسمح لأشخاص غير مصرح لهم بالدخول.' },
        ],
      },
      'clean-desk': {
        title: 'وثائق حساسة',
        description: 'لاحظت أن زميلاً ترك وثائق عملاء حساسة مكشوفة على مكتبه وجهازه غير مقفل أثناء الغداء.',
        choices: [
          { text: 'تجاهل - ليس شأني', correct: false, feedback: 'الأمن مسؤولية الجميع. البيانات غير المحمية خطر جدي.' },
          { text: 'اقفل جهازه وغطِّ الوثائق', correct: true, feedback: 'صحيح! ساعد في حماية المعلومات الحساسة وذكّره بسياسة المكتب النظيف.' },
          { text: 'التقط صورًا كدليل', correct: false, feedback: 'هذا ينشئ نسخًا إضافية من البيانات الحساسة. فقط أمّنها وأخبره.' },
          { text: 'أبلغ الموارد البشرية فورًا', correct: false, feedback: 'أمّن البيانات أولاً، ثم تحدث معه بشكل ودي. قد يكون خطأ بريء.' },
        ],
      },
      'public-wifi': {
        title: 'واي فاي عام',
        description: 'تعمل عن بُعد في مقهى وتحتاج الوصول لبريد الشركة. الواي فاي المجاني لا يتطلب كلمة مرور.',
        choices: [
          { text: 'اتصل واستخدم البريد بشكل عادي', correct: false, feedback: 'الواي فاي المفتوح يمكن مراقبته من قبل مهاجمين يمكنهم سرقة بياناتك.' },
          { text: 'استخدم نقطة اتصال هاتفك أو VPN', correct: true, feedback: 'صحيح! VPN يشفر حركة البيانات. نقطة اتصال الهاتف أكثر أمانًا أيضًا.' },
          { text: 'فقط استخدم المواقع غير الحساسة', correct: false, feedback: 'حتى التصفح "غير الحساس" يمكن أن يكشف ملفات تعريف الارتباط وكلمات المرور.' },
          { text: 'اتصل لكن لا تدخل كلمات مرور', correct: false, feedback: 'الجلسات المحفوظة وملفات تعريف الارتباط يمكن اختطافها على الشبكات غير الآمنة.' },
        ],
      },
      'shoulder-surfing': {
        title: 'التجسس من فوق الكتف',
        description: 'أثناء إدخال كلمة مرورك في مقهى، لاحظت أن شخصًا قريبًا يبدو أنه يراقب شاشتك باهتمام.',
        choices: [
          { text: 'استمر - ربما فضولي فقط', correct: false, feedback: 'التجسس من فوق الكتف تهديد حقيقي. احمِ شاشتك وبياناتك.' },
          { text: 'احجب شاشتك واستخدم فلتر خصوصية', correct: true, feedback: 'صحيح! الخصوصية الفيزيائية مهمة. فكر في فلتر شاشة الخصوصية.' },
          { text: 'اكتب أسرع حتى لا يرى', correct: false, feedback: 'المهاجمون المصممون يمكنهم الملاحظة. احجب شاشتك بدلاً من ذلك.' },
          { text: 'واجهه بعدوانية', correct: false, feedback: 'هذا قد يتصاعد. ببساطة احمِ شاشتك وانتقل إذا لزم الأمر.' },
        ],
      },
      'server-access': {
        title: 'الوصول لغرفة الخوادم',
        description: 'فني لا تعرفه يطلب منك السماح له بالدخول لغرفة الخوادم لأن "مدير تقنية المعلومات أرسله".',
        choices: [
          { text: 'دعه يدخل - يبدو محترفًا', correct: false, feedback: 'المظهر لا يعني شيئًا. الوصول غير المصرح به للخوادم قد يكون كارثيًا.' },
          { text: 'تحقق من مدير تقنية المعلومات أولاً', correct: true, feedback: 'تحقق دائمًا! مكالمة سريعة يمكن أن تمنع اختراقًا أمنيًا كبيرًا.' },
          { text: 'اطلب بطاقة هويته', correct: false, feedback: 'البطاقات يمكن تزويرها. التحقق المباشر مع مدير تقنية المعلومات ضروري.' },
          { text: 'دعه يدخل لكن ابقَ معه', correct: false, feedback: 'لا يجب السماح لأشخاص غير مصرح لهم بالدخول أصلاً - تحقق أولاً.' },
        ],
      },
      'ransomware-popup': {
        title: 'تنبيه برنامج فدية',
        description: 'ظهرت نافذة: "تم تشفير ملفاتك! ادفع 500 دولار بالبيتكوين خلال 24 ساعة." ملفاتك لا يمكن الوصول إليها.',
        choices: [
          { text: 'ادفع الفدية لاستعادة الملفات', correct: false, feedback: 'لا تدفع أبدًا للفدية! الدفع لا يضمن الاستعادة ويمول المجرمين.' },
          { text: 'افصل الشبكة وأبلغ تقنية المعلومات فورًا', correct: true, feedback: 'ممتاز! الفصل يمنع الانتشار. يمكن لتقنية المعلومات الاستعادة من النسخ الاحتياطية.' },
          { text: 'أغلق النافذة واستمر بالعمل', correct: false, feedback: 'التجاهل لن يساعد. سواء كان حقيقيًا أو مزيفًا، تقنية المعلومات بحاجة للتعامل معه.' },
        ],
      },
      'fake-antivirus': {
        title: 'تنبيه فحص أمني',
        description: 'نافذة تقول "Windows Defender اكتشف 47 تهديدًا! انقر على فحص الآن للإزالة فورًا."',
        choices: [
          { text: 'انقر على "فحص الآن" لإزالة التهديدات', correct: false, feedback: 'هذا احتيال! مضاد الفيروسات الحقيقي لا يستخدم نوافذ المتصفح.' },
          { text: 'أغلق المتصفح وشغل مضاد الفيروسات الحقيقي', correct: true, feedback: 'صحيح! أغلق التبويب دون النقر على أي شيء في النافذة.' },
          { text: 'اتصل بالرقم الموضح', correct: false, feedback: 'لا تتصل أبدًا بأرقام النوافذ المنبثقة! تتصل بالمحتالين.' },
        ],
      },
      'mobile-charging': {
        title: 'محطة شحن عامة',
        description: 'بطارية هاتفك 5% في مؤتمر. محطة شحن USB مجانية متاحة.',
        choices: [
          { text: 'استخدم كابل USB المتوفر', correct: false, feedback: 'هجمات "Juice jacking" تسرق البيانات عبر USB. الكابلات تنقل أكثر من الطاقة.' },
          { text: 'استخدم مقبس الكهرباء مع شاحنك الخاص', correct: true, feedback: 'رائع! شاحنك الخاص أو حاجز بيانات USB يمنع الهجمات.' },
          { text: 'إنه مؤتمر، لذا هو آمن', correct: false, feedback: 'المهاجمون يستهدفون المؤتمرات تحديدًا. لا تفترض أن USB العام آمن.' },
        ],
      },
      'qr-code-scam': {
        title: 'رمز QR على منشور',
        description: 'منشور يقول "عاجل: امسح QR لتسجيل سيارتك أو تواجه السحب." يحمل شعار الشركة.',
        choices: [
          { text: 'امسح فورًا لتجنب السحب', correct: false, feedback: 'رموز QR يمكن أن تؤدي لمواقع تصيد. الشعارات تُنسخ بسهولة.' },
          { text: 'تحقق مع الموارد البشرية/المرافق أولاً', correct: true, feedback: 'ممتاز! تغييرات السياسة الرسمية تأتي عبر قنوات موثقة.' },
          { text: 'الشعار يبدو حقيقيًا، إذن هو شرعي', correct: false, feedback: 'الشعارات تُزور بسهولة. تحقق دائمًا عبر مصادر رسمية.' },
        ],
      },
      'social-media-leak': {
        title: 'صورة على وسائل التواصل',
        description: 'زميل ينشر صور المكتب. تلاحظ لوحات بيضاء ببيانات اعتماد مرئية في الخلفية.',
        choices: [
          { text: 'إنه حسابه الشخصي', correct: false, feedback: 'المعلومات في خلفية الصور خطر أمني حقيقي يستغله المهاجمون.' },
          { text: 'اطلب منه بلطف إزالتها', correct: true, feedback: 'صحيح! ساعد الزملاء على فهم ما هو مرئي في صورهم.' },
          { text: 'أبلغ الموارد البشرية فورًا', correct: false, feedback: 'محادثة ودية أولاً أكثر فعالية. ربما لم يدرك.' },
        ],
      },
      'linkedin-phishing': {
        title: 'رسالة مجند LinkedIn',
        description: 'مجند يراسلك طالبًا رقم الضمان الاجتماعي وراتبك الحالي "لسجلاتهم."',
        choices: [
          { text: 'املأ النموذج', correct: false, feedback: 'المجندون الحقيقيون لا يطلبون رقم الضمان عبر نماذج إلكترونية. هذا سرقة هوية.' },
          { text: 'تجاهل أو أبلغ عنه كاحتيال', correct: true, feedback: 'ممتاز! المجندون الحقيقيون لا يطلبون معلومات حساسة مقدمًا.' },
          { text: 'شارك بريد العمل للوثائق', correct: false, feedback: 'لا تعطِ المحتالين بريد عملك - تحقق عبر القنوات الرسمية.' },
        ],
      },
      'cloud-sharing': {
        title: 'مشاركة ملف سريعة',
        description: 'بريد الشركة يحظر الملفات الكبيرة. زميل يقترح استخدام Google Drive الشخصي.',
        choices: [
          { text: 'استخدم Google Drive الشخصي', correct: false, feedback: 'الحسابات الشخصية تفتقر لضوابط الأمان والامتثال للشركة.' },
          { text: 'استخدم أدوات الشركة المعتمدة أو اسأل تقنية المعلومات', correct: true, feedback: 'صحيح! أدوات الشركة تحافظ على الأمان وضوابط الوصول.' },
          { text: 'أنشئ حسابًا جديدًا للعمل', correct: false, feedback: 'الحسابات غير المصرح بها تتجاوز سياسات الأمان أيضًا.' },
        ],
      },
      'disposal-fail': {
        title: 'التخلص من معدات قديمة',
        description: 'زميل يرمي قرصًا صلبًا قديمًا في سلة المهملات العادية. "تقنية المعلومات قالت إنه مُمسح."',
        choices: [
          { text: 'ساعده برميه', correct: false, feedback: 'الأقراص "الممسوحة" يمكن استعادتها. التخلص السليم يتطلب تدميرًا فيزيائيًا.' },
          { text: 'أعده لتقنية المعلومات للتخلص الآمن', correct: true, feedback: 'ممتاز! تقنية المعلومات تتعامل مع وسائط التخزين لضمان التدمير السليم.' },
          { text: 'حطمه بالمطرقة', correct: false, feedback: 'التدمير الذاتي غير آمن وقد لا يدمر البيانات بالكامل.' },
        ],
      },
    },

    // Level Select
    selectLevel: 'اختر المستوى',
    level1Name: 'المكتب الرئيسي',
    level1Subtitle: 'مبتدئ',
    level1Desc: 'تعلم أساسيات التوعية الأمنية',
    level2Name: 'مركز البيانات',
    level2Subtitle: 'متوسط',
    level2Desc: 'حماية البنية التحتية الحرجة',
    level3Name: 'الطابق التنفيذي',
    level3Subtitle: 'متقدم',
    level3Desc: 'الدفاع ضد الهجمات المستهدفة',
    scenarios: 'سيناريوهات',
    bestScore: 'الأفضل',
    unlockRequirement: 'أكمل المستوى السابق\nبنسبة 70%+',
    levelLocked: 'مقفل',

    // Data Center room labels
    serverHall: 'قاعة الخوادم',
    cooling: 'التبريد',
    network: 'عمليات الشبكة',
    securityStation: 'محطة الأمن',

    // Executive Floor room labels
    ceoOffice: 'مكتب الرئيس التنفيذي',
    boardroom: 'غرفة الاجتماعات',
    executiveAssistant: 'مساعد تنفيذي',
    vipReception: 'استقبال كبار الشخصيات',

    // Story mode
    skip: 'تخطي >>',
    clickToContinue: 'انقر للمتابعة...',
    storyCharacterName: 'ضابط الأمن تشين',
    story1Intro1: 'مرحبًا بك في شركة أكمي! أنا الضابط تشين، مرشدك لتصبح بطل التوعية الأمنية.',
    story1Intro2: 'اليوم هو يومك الأول في المكتب الرئيسي. ستتعلم كيفية اكتشاف التهديدات الأمنية الشائعة.',
    story1Intro3: 'تذكر: الأمن السيبراني مسؤولية الجميع. كن يقظًا!',
    story1Intro4: 'استكشف المكتب وتفاعل مع الأشياء المتوهجة للتعامل مع سيناريوهات الأمان.',
    story1Outro1: 'عمل ممتاز في يومك الأول! لقد أظهرت وعيًا أمنيًا رائعًا.',
    story1Outro2: 'لكن هناك المزيد لحمايته. تم اكتشاف نشاط غريب في مركز البيانات...',
    story2Intro1: 'اكتشفنا نشاطًا غير عادي على الشبكة. مركز البيانات يحتاج اهتمامك.',
    story2Intro2: 'هذه المنطقة تحتوي على بنيتنا التحتية الحرجة. المخاطر أعلى هنا.',
    story2Intro3: 'الأمن المادي والتحكم في الوصول أمران بالغا الأهمية. ثق ولكن تحقق.',
    story2Outro1: 'البنية التحتية آمنة. لكن تحقيقنا كشف عن تهديد أعمق...',
    story2Outro2: 'تشير المعلومات إلى أن المديرين التنفيذيين مستهدفون. توجه إلى الطابق التنفيذي.',
    story3Intro1: 'مرحبًا بك في الطابق التنفيذي. هنا يعمل الأهداف عالية القيمة.',
    story3Intro2: 'المهاجمون يستهدفون المديرين التنفيذيين بهندسة اجتماعية متطورة.',
    story3Intro3: 'احتيال الرئيس التنفيذي، التجسس الصناعي، التهديدات الداخلية... يجب أن تكون مستعدًا لأي شيء.',
    story3Outro1: 'رائع! لقد حميت شركة أكمي من الأعلى إلى الأسفل.',
    story3Outro2: 'أنت الآن رسميًا بطل التوعية الأمنية. المنظمة أكثر أمانًا بفضلك!',
    story3Outro3: 'تذكر: الأمن رحلة مستمرة، وليس وجهة. ابق يقظًا!',
  },
};

// Get current language from localStorage or default to English
export function getCurrentLanguage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('cybersafe-language') || 'en';
  }
  return 'en';
}

// Set current language
export function setCurrentLanguage(lang) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cybersafe-language', lang);
  }
}

// Get translation
export function t(key) {
  const lang = getCurrentLanguage();
  const keys = key.split('.');
  let value = translations[lang];

  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations['en'];
      for (const k2 of keys) {
        if (value && value[k2] !== undefined) {
          value = value[k2];
        } else {
          return key;
        }
      }
      break;
    }
  }

  return value;
}

// Check if current language is RTL
export function isRTL() {
  return getCurrentLanguage() === 'ar';
}
