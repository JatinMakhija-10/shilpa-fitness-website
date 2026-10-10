import { ServiceDetail } from '@/types';

export const servicesData: Record<string, ServiceDetail> = {
  pilates: {
    id: 'pilates',
    slug: 'pilates',
    name: 'Classical & Reformer Pilates',
    tagline: 'Deep core strength, posture alignment, and controlled strength in intimate groups of 4 to 6.',
    shortDescription:
      'No loud music, no intimidating gym crowds. Controlled spring resistance and mat work coached by Shilpa with individual corrections on every single repetition.',
    fullDescription:
      'Our Pilates program blends Joseph Pilates classical methodology with contemporary biomechanics. Whether using balanced spring-tensioned Reformers or precision mat work, sessions are engineered to strengthen the deep stabilizing core, lengthen tight hip flexors, decompress vertebrae, and correct muscular imbalances caused by sedentary work.',
    whoItIsFor: [
      'Beginners who feel overwhelmed or intimidated by commercial gym environments.',
      'Working professionals sitting 8+ hours a day experiencing postural slump and tight shoulders.',
      'Anyone seeking lean, functional strength, improved balance, and joint resilience without heavy joint impact.',
      'Those returning to fitness after an extended break who need attentive supervision.',
    ],
    whatHappensInClass: [
      'Warm-up & Breathing: 8 minutes activating transverse abdominis and lateral ribcage breathing.',
      'Reformer & Spring Calibration: 25 minutes of progressive eccentric resistance targeting glutes, deep core, and scapular stabilizers.',
      'Precision Mat Work: 12 minutes of classical series (The Hundred, Single Leg Stretch, Spine Stretch Forward) customized to your mobility.',
      'Spinal Articulation & Cool-down: 5 minutes restorative decompression and posture reset.',
    ],
    sessionDuration: '50 minutes',
    batchSize: 'Maximum 4 to 6 clients per batch',
    equipmentUsed: ['Studio Reformers with Jumpboards', 'Pilates Spine Correctors', 'Magic Circles', 'Resistance Bands', 'High-density Mats'],
    whatToWearAndBring: [
      'Fitted, comfortable workout attire (leggings and breathable top) so joint alignment is clearly visible.',
      'Grip socks with rubberized soles (mandatory for Reformer carriage safety; available at studio).',
      'Personal water bottle and a small sweat towel.',
    ],
    faqs: [
      {
        question: 'I have never done Pilates before. Will I be able to keep up?',
        answer: 'Absolutely. Over 70% of our clients walked in having never touched a Reformer. Batches are strictly capped at 4 to 6 people so Shilpa individually modifies spring tensions and hand placements for your level.',
      },
      {
        question: 'Is Pilates mainly for women or can men join too?',
        answer: 'Pilates was originally invented by Joseph Pilates for athlete conditioning and rehabilitation. We welcome anyone seeking core strength and postural balance.',
      },
      {
        question: 'How quickly will I notice posture and strength improvements?',
        answer: 'Most clients report noticeably reduced lower back stiffness and improved posture awareness within 3 to 4 weeks (attending 2 to 3 sessions weekly).',
      },
    ],
    accentColor: '#4A1D26',
  },

  rehab: {
    id: 'rehab',
    slug: 'rehab',
    name: 'Rehabilitation & Pain Management Pilates',
    tagline: 'Clinically informed, low-impact spinal and joint rehabilitation for chronic back, neck, and knee pain.',
    shortDescription:
      'Designed specifically for slipped discs, cervical spondylosis, sciatica, knee ACL/meniscus recovery, and desk-bound muscular strain. Coached with medical intake reviews.',
    fullDescription:
      'Pain changes how your brain recruits muscle. When chronic pain sets in, the body compensates by overworking secondary muscles and shutting down stabilizing deep stabilizers. Rehab Pilates systematically reprograms neuromuscular movement patterns. Shilpa coordinates with your orthopedic doctor or physical therapist notes to rebuild spinal decompression, pelvis stabilization, and pain-free mobility.',
    whoItIsFor: [
      'Individuals suffering from lumbar disc bulge, L4-L5/L5-S1 herniation, or chronic sciatica.',
      'Desk workers with cervical spine stiffness, rounded shoulders, and tension headaches.',
      'Clients post-orthopedic physical therapy needing safe, progressive long-term conditioning.',
      'Anyone diagnosed with mild osteoarthritis, sacroiliac (SI) joint dysfunction, or knee patellofemoral pain.',
    ],
    whatHappensInClass: [
      'Intake Check & Symptom Assessment: 5 minutes checking daily pain scale and movement restrictions.',
      'Gentle Decompression & Neutral Pelvis Calibration: 15 minutes utilizing spring support to unload spinal gravity pressure.',
      'Targeted Stabilizer Strengthening: 20 minutes focused on multifidus, transverse abdominis, and gluteus medius without spine flexion.',
      'Mobility & Myofascial Release: 10 minutes targeted myofascial stretching to release tight hip flexors and piriformis.',
    ],
    sessionDuration: '45 to 50 minutes',
    batchSize: '1-on-1 or Semi-Private (2 clients max) for acute recovery; specialized small rehab batches',
    equipmentUsed: ['Pilates Cadillac / Trapeze Table', 'Reformer with low-load springs', 'Spine Arcs', 'Foam Rollers & Trigger Balls'],
    whatToWearAndBring: [
      'Comfortable clothing that allows free joint movement.',
      'Grip socks.',
      'Recent MRI / X-ray reports or your physical therapist / orthopedic doctor prescription notes for initial review.',
    ],
    faqs: [
      {
        question: 'Do I need doctor clearance before starting Rehab Pilates?',
        answer: 'If you have an acute injury, recent spinal surgery, or severe disc herniation, we require written medical clearance or your doctor’s rehabilitation guidelines. Shilpa reviews all scans during your initial intake.',
      },
      {
        question: 'Will these exercises hurt or aggravate my slip disc?',
        answer: 'Never. The primary rule of rehab is pain-free movement. Every spring setting is dialed down to gently support rather than strain your spine. If any movement triggers pain, we stop and adjust immediately.',
      },
      {
        question: 'Can this replace my physiotherapy sessions?',
        answer: 'Rehab Pilates is the ideal bridge between clinical physiotherapy and daily life fitness. Once acute clinical therapy ends, our program ensures you do not relapse by building durable muscular armor.',
      },
    ],
    accentColor: '#36302B',
  },

  prenatal: {
    id: 'prenatal',
    slug: 'prenatal',
    name: 'Prenatal & Postnatal Safe Pilates',
    tagline: 'Trimester-specific pelvic floor conditioning, back support, and safe birth preparation under certified coaching.',
    shortDescription:
      'Safely navigate physical pregnancy changes and postpartum recovery. Gentle, certified movements that protect your abdominal wall and ease pregnancy aches.',
    fullDescription:
      'During pregnancy, the hormone relaxin softens ligaments while your center of gravity shifts forward, putting immense strain on the lower back, sacroiliac joints, and pelvic floor. Our Prenatal Pilates classes are certified, evidence-based sessions structured strictly by trimester. We eliminate prone (stomach-down) and prolonged supine (flat-on-back) positions, focusing instead on deep core breathwork, labor endurance, and preventing diastasis recti (abdominal separation).',
    whoItIsFor: [
      'Expectant mothers from week 13 (second trimester) through week 38 (with OB-GYN clearance).',
      'Pregnant women experiencing pelvic girdle pain, sciatica, swollen ankles, or ribcage discomfort.',
      'Postpartum mothers (6+ weeks post-vaginal birth or 10-12 weeks post-cesarean) aiming to heal diastasis recti and rebuild pelvic floor stability.',
      'First-time mothers wanting breathwork and pelvic endurance preparation for labor.',
    ],
    whatHappensInClass: [
      'Vitals & Comfort Check: 5 minutes checking maternal comfort, hydration, and daily symptoms.',
      'Diaphragmatic Breath & Pelvic Floor Lift: 10 minutes coordinating 360-degree breathing with gentle transverse abdominis engagement.',
      'Supported Reformer / Mat Conditioning: 25 minutes using wedges, bolsters, and light spring support for hip stability and upper back strength.',
      'Gentle Hip Opening & Labor Prep Stretches: 10 minutes restorative positions easing pelvis and sacral pressure.',
    ],
    sessionDuration: '45 minutes',
    batchSize: 'Maximum 3 to 4 expectant mothers per batch, or 1-on-1 private sessions',
    equipmentUsed: ['Prenatal Wedge Pillows & Angled Bolsters', 'Light Resistance Reformers', 'Pilates Sitting Balls', 'Therabands'],
    whatToWearAndBring: [
      'Stretchy, non-restrictive maternity fitness wear.',
      'Grip socks.',
      'Signed clearance letter from your OB-GYN confirming you are cleared for low-impact prenatal exercise.',
      'Water bottle and a light snack if needed.',
    ],
    faqs: [
      {
        question: 'When during my pregnancy can I begin classes?',
        answer: 'We typically welcome expectant mothers starting at week 13 (beginning of the second trimester), provided your consulting OB-GYN provides written consent.',
      },
      {
        question: 'Are abdominal exercises safe during pregnancy?',
        answer: 'Traditional crunches and planks are completely avoided as they create intra-abdominal pressure and worsen diastasis recti. Instead, we train the deep transverse abdominis and pelvic floor with specialized safe breathing mechanics.',
      },
      {
        question: 'How soon after delivery can I start Postnatal Pilates?',
        answer: 'Generally after 6 weeks for an uncomplicated vaginal delivery, or 10-12 weeks following a cesarean section, following sign-off from your doctor at your postnatal checkup.',
      },
    ],
    accentColor: '#B8A38C',
  },

  'face-yoga': {
    id: 'face-yoga',
    slug: 'face-yoga',
    name: 'Natural Face Yoga & Lymphatic Sculpt',
    tagline: 'Non-invasive facial muscle toning, lymphatic drainage, and jaw tension release through proven daily routines.',
    shortDescription:
      'Just like the body, the face has over 57 muscles that can be sculpted and toned. Relieve TMJ jaw grinding, lift cheeks, diminish under-eye puffiness, and restore natural glow.',
    fullDescription:
      'Face Yoga combines targeted facial resistance exercises, acupressure stimulation, and gentle lymphatic drainage massage. In our digital age, prolonged screen time causes "tech neck", forehead furrows, and clenched jaw tension. Shilpa’s structured sessions teach you accurate finger placement, posture alignment, and muscle isolation to smooth expression lines, firm the jawline, and stimulate collagen synthesis naturally.',
    whoItIsFor: [
      'Anyone experiencing jaw clenching, TMJ discomfort, or waking with tight facial tension.',
      'Those noticing tech-neck lines, sagging around the jawline, or loss of cheek volume.',
      'Individuals dealing with morning facial puffiness, fluid retention, or dark under-eye circles.',
      'Women seeking a holistic, non-invasive, natural alternative to cosmetic injectables.',
    ],
    whatHappensInClass: [
      'Posture Alignment & Neck Decompression: 8 minutes releasing sternocleidomastoid and upper trapezius tension.',
      'Lymphatic Drainage Warmup: 7 minutes gentle clavicle and jawline drainage strokes reducing fluid retention.',
      'Targeted Facial Resistance Work: 20 minutes isolating eye ring muscles (orbicularis oculi), cheek lifters (zygomaticus), and jawline.',
      'Acupressure & Calming Gua Sha / Hand Massage: 10 minutes soothing touch point release leaving skin flushed with fresh circulation.',
    ],
    sessionDuration: '40 minutes',
    batchSize: 'In-Studio Weekend Masterclasses & Live Online Batches with 7-Day Replays',
    equipmentUsed: ['Clean hands', 'Organic cold-pressed facial oil (jojoba or rosehip)', 'Optional smooth jade / rose quartz Gua Sha tool'],
    whatToWearAndBring: [
      'Clean, makeup-free face (skin should be cleansed before class).',
      'Hair pulled back comfortably away from forehead and ears.',
      'Small hand mirror so you can check muscle isolation without craning your neck.',
    ],
    faqs: [
      {
        question: 'Can Face Yoga cause more wrinkles if done incorrectly?',
        answer: 'This is why live certified coaching is critical. Doing face exercises without stabilizing surrounding skin with your fingers can crease skin. Shilpa teaches precise finger locks that isolate the muscle without wrinkling the epidermis.',
      },
      {
        question: 'How many times a week do I need to practice to see results?',
        answer: 'Attending 2 live coached sessions a week combined with a 5-minute daily morning routine delivers visible lifting and reduced puffiness in 3 to 4 weeks.',
      },
      {
        question: 'Can I join Face Yoga if I have had Botox or dermal fillers?',
        answer: 'You must wait at least 3 to 4 weeks after Botox or filler treatments before performing facial massage or muscle resistance, and consult your cosmetic dermatologist.',
      },
    ],
    accentColor: '#E8C9CB',
  },
};
