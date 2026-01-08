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
        ]
    };

    const sections = isTamil ? content.ta : content.en;

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
