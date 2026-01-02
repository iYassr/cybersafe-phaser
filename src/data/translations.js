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
    },
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
    },
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
