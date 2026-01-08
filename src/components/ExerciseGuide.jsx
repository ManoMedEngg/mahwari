export default function ExerciseGuide({ t }) {
    // Normally, t should contain all nested translation strings.
    // For this demo, we'll map English structure to language localized structure manually or simplify.
    // Since the user provided Tamil text earlier, we will assume for now that if 'ta' is selected, we show Tamil. 
    // But wait! The dictionary only has UI keys. We need the CONTENT to be localized too.
    // The 't' passed here is `translations[lang]`. 
    // We need a robust data structure for the content itself. 
    // Let's create a local data object that switches based on the lang key found in `t.langName`.

    // Checking lang based on langName string is brittle, but efficient for this constraint.
    const isTamil = t.langName.includes('Tamil');

    // Realistically, content should be in the dictionary too. 
    // Let's assume content is static English/Tamil hybrid as requested previously, OR fully localized if I had the text.
    // Given I only have English and Tamil, I will toggle between those. Others will default to English for content.

    const content = {
        en: [
            {
                title: '1. Cardio Exercises',
                desc: 'Increases heart rate and burns fat.',
                items: [
                    { name: 'Brisk Walking', note: '30-45 mins daily improves insulin sensitivity.', img: '/walking.png' },
                    { name: 'Cycling', note: 'Strengthens abs and reduces weight.', img: '/cycling.png' },
                    { name: 'Swimming', note: 'Great for hormone balance.', img: '/swimming.png' }
                ]
            },
            {
                title: '2. Yoga Asanas',
                desc: 'Reduces stress and balances hormones.',
                items: [
                    { name: 'Butterfly Pose', note: 'Increases blood flow to ovaries.', img: '/butterfly.png' },
                    { name: 'Cobra Pose', note: 'Stretches abdomen, fixes period issues.', img: '/cobra.png' },
                    { name: 'Bow Pose', note: 'Stimulates reproductive organs.', img: '/bow.png' },
                    { name: 'Surya Namaskar', note: 'Revitalizes entire body. 10-12 sets.', img: '/surya.png' }
                ]
            },
            {
                title: '3. Strength Training',
                desc: 'Muscle building regulates blood sugar.',
                items: [
                    { name: 'Squats', note: 'Strengthens legs and hips.', img: '/squat.png' },
                    { name: 'Plank', note: 'Strengthens core muscles.', img: '/plank.png' },
                    { name: 'Light Weights', note: '2-3 times a week.', img: '/weights.png' }
                ]
            }
        ],
        ta: [
            {
                title: '1. கார்டியோ உடற்பயிற்சிகள்',
                desc: 'இதயத் துடிப்பை அதிகரித்து உடலில் உள்ள தேவையற்ற கொழுப்பை எரிக்க உதவும்.',
                items: [
                    { name: 'வேகமான நடைப்பயிற்சி', note: 'தினமும் 30-45 நிமிடங்கள் வேகமாக நடப்பது இன்சுலின் உணர்திறனை மேம்படுத்தும்.', img: '/walking.png' },
                    { name: 'சைக்கிள் ஓட்டுதல்', note: 'அடிவயிற்று தசைகளுக்கு வலுவூட்டி, உடல் எடையைக் குறைக்க உதவும்.', img: '/cycling.png' },
                    { name: 'நீச்சல்', note: 'ஒட்டுமொத்த உடல் ஆரோக்கியத்திற்கும் ஹார்மோன் சமநிலைக்கும் இது மிகவும் சிறந்தது.', img: '/swimming.png' }
                ]
            },
            {
                title: '2. யோகாசனங்கள்',
                desc: 'PCOD-க்கு யோகா ஒரு சிறந்த மருந்தாகும், ஏனெனில் இது மன அழுத்தத்தைக் குறைத்து ஹார்மோன் சுரப்பைச் சீராக்குகிறது.',
                items: [
                    { name: 'பத்ராசனம்', note: 'இடுப்புப் பகுதிக்கு இரத்த ஓட்டத்தை அதிகரித்து சினைப்பை ஆரோக்கியத்தை மேம்படுத்தும்.', img: '/butterfly.png' },
                    { name: 'புஜங்காசனம்', note: 'அடிவயிற்றுப் பகுதியை நீட்டிப்பதன் மூலம் மாதவிடாய் கோளாறுகளைச் சரிசெய்யும்.', img: '/cobra.png' },
                    { name: 'தனுராசனம்', note: 'இனப்பெருக்க உறுப்புகளைத் தூண்டி, சீரான மாதவிடாய்க்கு உதவும்.', img: '/bow.png' },
                    { name: 'சூரிய நமஸ்காரம்', note: 'தினமும் 10-12 முறை செய்வது முழு உடலுக்கும் புத்துயிர் அளிக்கும்.', img: '/surya.png' }
                ]
            },
            {
                title: '3. வலிமைப் பயிற்சிகள்',
                desc: 'தசைகளை வலுப்படுத்துவது உடலில் உள்ள சர்க்கரை அளவைச் சீராக வைக்க உதவும்.',
                items: [
                    { name: 'ஸ்குவாட்ஸ்', note: 'கால்கள் மற்றும் இடுப்புத் தசைகளை வலுப்படுத்தும்.', img: '/squat.png' },
                    { name: 'பிளாங்க்', note: 'அடிவயிற்றுத் தசைகளை உறுதிப்படுத்தும்.', img: '/plank.png' },
                    { name: 'லேசான எடைகளைத் தூக்குதல்', note: 'வாரத்திற்கு 2 அல்லது 3 முறை செய்யலாம்.', img: '/weights.png' }
                ]
            }
        ],
        ml: [
            {
                title: '1. കാർഡിയോ വ്യായാമങ്ങൾ',
                desc: 'ഹൃദയമിടിപ്പ് വർദ്ധിപ്പിക്കുകയും കൊഴുപ്പ് കുറയ്ക്കാൻ സഹായിക്കുകയും ചെയ്യുന്നു.',
                items: [
                    { name: 'വേഗത്തിലുള്ള നടത്തം', note: 'ദിവസവും 30-45 മിനിറ്റ് നടക്കുന്നത് ഇൻസുലിൻ സംവേദനക്ഷമത മെച്ചപ്പെടുത്തുന്നു.', img: '/walking.png' },
                    { name: 'സൈക്ലിംഗ്', note: 'വയറിലെ പേശികളെ ബലപ്പെടുത്തുകയും ഭാരം കുറയ്ക്കാൻ സഹായിക്കുകയും ചെയ്യുന്നു.', img: '/cycling.png' },
                    { name: 'നീന്തൽ', note: 'ഹോർമോൺ തുലനത്തിന് വളരെ നല്ലതാണ്.', img: '/swimming.png' }
                ]
            },
            {
                title: '2. യോഗ ആസനങ്ങൾ',
                desc: 'സമ്മർദ്ദം കുറയ്ക്കുകയും ഹോർമോണുകളെ സന്തുലിതമാക്കുകയും ചെയ്യുന്നു.',
                items: [
                    { name: 'ബട്ടർഫ്ലൈ പോസ്', note: 'അണ്ഡാശയത്തിലേക്കുള്ള രക്തയോട്ടം വർദ്ധിപ്പിക്കുന്നു.', img: '/butterfly.png' },
                    { name: 'കോബ്ര പോസ്', note: 'വയറിലെ പേശികളെ വലിച്ചുനീട്ടുകയും ആർത്തവ പ്രശ്നങ്ങൾ പരിഹരിക്കുകയും ചെയ്യുന്നു.', img: '/cobra.png' },
                    { name: 'ബൗ പോസ്', note: 'പ്രത്യുൽപ്പാദന അവയവങ്ങളെ ഉത്തേജിപ്പിക്കുന്നു.', img: '/bow.png' },
                    { name: 'സൂര്യനമസ്കാരം', note: 'ശരീരത്തിന് ആകമാനം ഉന്മേഷം നൽകുന്നു. 10-12 സെറ്റുകൾ.', img: '/surya.png' }
                ]
            },
            {
                title: '3. സ്ട്രെങ്ത് ട്രെയിനിംഗ്',
                desc: 'പേശികളെ വളർത്തുന്നത് രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് നിയന്ത്രിക്കാൻ സഹായിക്കും.',
                items: [
                    { name: 'സ്ക്വാറ്റുകൾ', note: 'കാലുകളെയും ഇടുപ്പിനെയും ശക്തിപ്പെടുത്തുന്നു.', img: '/squat.png' },
                    { name: 'പ്ലാങ്ക്', note: 'വയറിലെ പേശികളെ ശക്തിപ്പെടുത്തുന്നു.', img: '/plank.png' },
                    { name: 'ലഘുവെയ്റ്റ്സ്', note: 'ആഴ്ചയിൽ 2-3 തവണ.', img: '/weights.png' }
                ]
            }
        ],
        kn: [
            {
                title: '1. ಕಾರ್ಡಿಯೋ ವ್ಯಾಯಾಮಗಳು',
                desc: 'ಹೃದಯ ಬಡಿತವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ ಮತ್ತು ಕೊಬ್ಬನ್ನು ಕರಗಿಸುತ್ತದೆ.',
                items: [
                    { name: 'ವೇಗವಾಗಿ ನಡೆಯುವುದು', note: 'ದಿನಕ್ಕೆ 30-45 ನಿಮಿಷಗಳು ಇನ್ಸುಲಿನ್ ಸೂಕ್ಷ್ಮತೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.', img: '/walking.png' },
                    { name: 'ಸೈಕ್ಲಿಂಗ್', note: 'ಹೊಟ್ಟೆಯ ಸ್ನಾಯುಗಳನ್ನು ಬಲಪಡಿಸುತ್ತದೆ ಮತ್ತು ತೂಕವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.', img: '/cycling.png' },
                    { name: 'ಈಜು', note: ' ಹಾರ್ಮೋನ್ ಸಮತೋಲನಕ್ಕೆ ಉತ್ತಮ.', img: '/swimming.png' }
                ]
            },
            {
                title: '2. ಯೋಗ ಆಸನಗಳು',
                desc: 'ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಹಾರ್ಮೋನುಗಳನ್ನು ಸಮತೋಲನಗೊಳಿಸುತ್ತದೆ.',
                items: [
                    { name: 'ಚಿಟ್ಟೆ ಆಸನ', note: 'ಅಂಡಾಶಯಗಳಿಗೆ ರಕ್ತದ ಹರಿವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.', img: '/butterfly.png' },
                    { name: 'ಭುಜಂಗಾಸನ', note: 'ಹೊಟ್ಟೆಯನ್ನು ಹಿಗ್ಗಿಸುತ್ತದೆ, ಮುಟ್ಟಿನ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸುತ್ತದೆ.', img: '/cobra.png' },
                    { name: 'ಧನುರಾಸನ', note: 'ಸಂತಾನೋತ್ಪತ್ತಿ ಅಂಗಗಳನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ.', img: '/bow.png' },
                    { name: 'ಸೂರ್ಯ ನಮಸ್ಕಾರ', note: 'ಇಡೀ ದೇಹವನ್ನು ಪುನರುಜ್ಜೀವನಗೊಳಿಸುತ್ತದೆ. 10-12 ಸೆಟ್ಗಳು.', img: '/surya.png' }
                ]
            },
            {
                title: '3. ಶಕ್ತಿ ತರಬೇತಿ',
                desc: 'ಸ್ನಾಯುಗಳನ್ನು ಬಲಪಡಿಸುವುದು ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ ಮಟ್ಟವನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
                items: [
                    { name: 'ಸ್ಕ್ವಾಟ್ಸ್', note: 'ಕಾಲುಗಳು ಮತ್ತು ಸೊಂಟವನ್ನು ಬಲಪಡಿಸುತ್ತದೆ.', img: '/squat.png' },
                    { name: 'ಪ್ಲಾಂಕ್', note: 'ಕೋರ್ ಸ್ನಾಯುಗಳನ್ನು ಬಲಪಡಿಸುತ್ತದೆ.', img: '/plank.png' },
                    { name: 'ಹಗುರವಾದ ತೂಕ', note: 'ವಾರಕ್ಕೆ 2-3 ಬಾರಿ.', img: '/weights.png' }
                ]
            }
        ],
        te: [
            {
                title: '1. కార్డియో వ్యాయామాలు',
                desc: 'హృదయ స్పందన రేటు పెంచుతుంది మరియు కొవ్వు కరిగిస్తుంది.',
                items: [
                    { name: 'వేగంగా నడవడం', note: 'రోజుకు 30-45 నిమిషాలు ఇన్సులిన్ సెన్సిటివిటీని మెరుగుపరుస్తుంది.', img: '/walking.png' },
                    { name: 'సైక్లింగ్', note: 'పొట్ట కండరాలను బలపరుస్తుంది మరియు బరువును తగ్గిస్తుంది.', img: '/cycling.png' },
                    { name: 'స్విమ్మింగ్', note: 'హార్మోన్ సమతుల్యతకు చాలా మంచిది.', img: '/swimming.png' }
                ]
            },
            {
                title: '2. యోగాసనాలు',
                desc: 'ఒత్తిడిని తగ్గిస్తుంది మరియు హార్మోన్లను సమతుల్యం చేస్తుంది.',
                items: [
                    { name: 'బటర్ఫ్లై పోజ్', note: 'అండాశయాలకు రక్త ప్రవాహాన్ని పెంచుతుంది.', img: '/butterfly.png' },
                    { name: 'భుజంగాసనం', note: 'పొట్టను సాగదీస్తుంది, పీరియడ్స్ సమస్యలను పరిష్కరిస్తుంది.', img: '/cobra.png' },
                    { name: 'ధనురాసనం', note: 'పునరుత్పత్తి అవయవాలను ప్రేరేపిస్తుంది.', img: '/bow.png' },
                    { name: 'సూర్య నమస్కారం', note: 'మొత్తం శరీరాన్ని ఉత్తేజపరుస్తుంది. 10-12 సెట్లు.', img: '/surya.png' }
                ]
            },
            {
                title: '3. స్ట్రెంత్ ట్రైనింగ్',
                desc: 'కండరాలను పెంచడం రక్తంలోని చక్కెర స్థాయిలను నియంత్రించడంలో సహాయపడుతుంది.',
                items: [
                    { name: 'స్క్వాట్స్', note: 'కాళ్ళు మరియు తుంటిని బలపరుస్తుంది.', img: '/squat.png' },
                    { name: 'ప్లాంక్', note: 'కోర్ కండరాలను బలపరుస్తుంది.', img: '/plank.png' },
                    { name: 'తేలికపాటి బరువులు', note: 'వారానికి 2-3 సార్లు.', img: '/weights.png' }
                ]
            }
        ],
        ur: [
            {
                title: '1. کارڈیو ورزشی',
                desc: 'دل کی دھڑکن بڑھاتی ہے اور چربی جلاتی ہے۔',
                items: [
                    { name: 'تیز چلنا', note: 'روزانہ 30-45 منٹ انسولین کی حساسیت کو بہتر بناتا ہے۔', img: '/walking.png' },
                    { name: 'سائیکلنگ', note: 'پیٹ کے پٹھوں کو مضبوط کرتی ہے اور وزن کم کرتی ہے۔', img: '/cycling.png' },
                    { name: 'تیراکی', note: 'ہارمون بیلنس کے لیے بہترین ہے۔', img: '/swimming.png' }
                ]
            },
            {
                title: '2. یوگا آسن',
                desc: 'تناؤ کم کرتا ہے اور ہارمونز کو متوازن کرتا ہے۔',
                items: [
                    { name: 'تتلی پوز', note: 'انڈاشیوں کی طرف خون کے بہاؤ کو بڑھاتا ہے۔', img: '/butterfly.png' },
                    { name: 'کوبرا پوز', note: 'پیٹ کو کھینچتا ہے، ماہواری کے مسائل حل کرتا ہے۔', img: '/cobra.png' },
                    { name: 'بچ پوز', note: 'تولیدی اعضا کو متحرک کرتا ہے۔', img: '/bow.png' },
                    { name: 'سوریا نمسکار', note: 'پورے جسم کو توانائی دیتا ہے۔ 10-12 سیٹ۔', img: '/surya.png' }
                ]
            },
            {
                title: '3. طاقت کی تربیت',
                desc: 'پٹھوں کی تعمیر خون میں شوگر کی سطح کو منظم کرنے میں مدد کرتی ہے۔',
                items: [
                    { name: 'اسکواٹس', note: 'ٹانگوں اور کولہوں کو مضبوط بناتا ہے۔', img: '/squat.png' },
                    { name: 'پلانک', note: 'بنیادی پٹھوں کو مضبوط بناتا ہے۔', img: '/plank.png' },
                    { name: 'ہلکا وزن', note: 'ہفتے میں 2-3 بار۔', img: '/weights.png' }
                ]
            }
        ]
    };

    let key = 'en';
    if (t.langName.includes('Tamil')) key = 'ta';
    else if (t.langName.includes('Malayalam')) key = 'ml';
    else if (t.langName.includes('Kannada')) key = 'kn';
    else if (t.langName.includes('Telugu')) key = 'te';
    else if (t.langName.includes('Urdu')) key = 'ur';

    const sections = content[key] || content.en;

    return (
        <div className="exercise-container fade-in">
            <h2 style={{ marginBottom: '20px', color: 'hsl(var(--hue), 100%, 50%)' }}>{t.exercise} Guide</h2>
            <div className="tips glass" style={{ padding: '15px', marginBottom: '20px', fontSize: '0.9rem' }}>
                <strong>Note:</strong> Consistency is key. 5 days a week.
            </div>

            {sections.map((section, idx) => (
                <section key={idx} className="mb-6">
                    <h3 className="section-title">{section.title}</h3>
                    <p className="section-desc">{section.desc}</p>
                    <div className="exercise-list">
                        {section.items.map((item, i) => (
                            <div key={i} className="exercise-card glass">
                                {item.img && <img src={item.img} alt={item.name} className="exercise-img" />}
                                <div className="exercise-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <style jsx>{`
        .exercise-container { padding-bottom: 80px; }
        .section-title { color: var(--text-color); margin-bottom: 5px; font-size: 1.1rem; }
        .section-desc { color: var(--muted-text); font-size: 0.9rem; margin-bottom: 15px; }
        .mb-6 { margin-bottom: 25px; }
        .exercise-list { display: flex; flex-direction: column; gap: 10px; }
        .exercise-card { display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 12px; }
        .exercise-img { width: 60px; height: 60px; object-fit: contain; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 5px; }
        .exercise-info h4 { font-size: 1rem; margin-bottom: 5px; color: hsl(var(--hue), 100%, 70%); }
        .exercise-info p { font-size: 0.85rem; color: var(--text-color); line-height: 1.4; }
        .fade-in { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
        </div>
    );
}
