export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "Beginner" | "Technique" | "Safety" | "Spot Guide" | "Gear";
  content: Section[];
}

export interface Section {
  type: "intro" | "heading" | "paragraph" | "list" | "numbered" | "tip";
  text?: string;
  items?: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "how-to-prepare-for-kitesurfing-lessons",
    title: "How to Prepare for Your First Kitesurfing Lesson",
    excerpt: "You booked your lesson. Now what? Six practical things you can do before you show up on Atlantis Beach that will make your first session faster, safer and more fun.",
    date: "2023-05-31",
    readTime: "4 min",
    category: "Beginner",
    content: [
      { type: "intro", text: "You booked your lesson. You're coming to Bonaire. The wind is already blowing 20 knots in your head. Here's how to make sure your first session counts." },
      { type: "heading", text: "1. Watch some videos" },
      { type: "paragraph", text: "You don't need to become an expert before you arrive — that's what we're here for. But spending 20 minutes watching a kitesurfing lesson video gives you a mental map of what's about to happen. You'll recognise the kite positions, understand what body dragging looks like, and your brain will absorb the real thing faster on the day." },
      { type: "heading", text: "2. Go swimming" },
      { type: "paragraph", text: "Kitesurfing happens in the ocean. You'll be in the water for most of your first lesson. You don't need to be a competitive swimmer, but you should be comfortable floating and swimming in open water above your head. If you're not there yet, spend a few sessions in the pool before you fly." },
      { type: "heading", text: "3. Work on your core" },
      { type: "paragraph", text: "The kite pulls through your entire body, and your core is where that force travels. You don't need to be an athlete — plenty of people with no particular fitness learn to kitesurf. But a month of basic core work (planks, yoga, swimming) means less fatigue in the water and better body position from the start." },
      { type: "heading", text: "4. Learn to read the wind" },
      { type: "paragraph", text: "Wind is everything in this sport. Before your lesson, spend a few days watching our live forecast. Learn what 15 knots looks like versus 25. Understand the difference between east wind and north wind at Atlantis Beach. Your instructor will teach you everything, but showing up already curious about wind makes the conversation richer." },
      { type: "heading", text: "5. Come rested and fuelled" },
      { type: "paragraph", text: "Sessions are physical. Show up hydrated, with food in your stomach, and not running on two hours of sleep from a late Bonaire night. Your body learns faster when it's not fighting itself." },
      { type: "heading", text: "6. Arrive with an open mind" },
      { type: "paragraph", text: "The biggest thing beginners struggle with isn't physical — it's mental. Kitesurfing feels overwhelming at first because there's a lot happening at once. The riders you see flying past on the water went through the same confusion. Trust the process. Trust your instructor. The sport clicks, and when it does, it really clicks." },
      { type: "tip", text: "The only thing you need to bring: a swimsuit, water shoes if you have them, sunscreen, and yourself. We take care of everything else." },
    ],
  },
  {
    slug: "what-to-watch-for-during-a-kitesurfing-session",
    title: "What to Watch For During a Kitesurfing Session on Bonaire",
    excerpt: "Kitesurfing isn't just about the kite. Here's what experienced riders pay attention to on and around Atlantis Beach — and why it matters for your safety and enjoyment.",
    date: "2023-02-22",
    readTime: "3 min",
    category: "Safety",
    content: [
      { type: "intro", text: "Kitesurfing is an exciting sport. It's also one where staying aware of your environment is part of riding well. Here's what to pay attention to every time you go out." },
      { type: "heading", text: "Other people on the water" },
      { type: "paragraph", text: "Atlantis Beach has swimmers, snorkelers, boat traffic and other kiters. Right of way rules exist and matter. As a general rule: the kiter on the water has right of way over the kiter in the air. Downwind riders give way to upwind riders. Give everyone space, communicate with other kiters through hand signals, and never launch or land your kite near people in the water." },
      { type: "heading", text: "Buoys and markers" },
      { type: "paragraph", text: "Bonaire's waters are marked for good reason. Buoys indicate safe swimming zones and hidden underwater hazards — mostly reef. At Atlantis Beach, pay close attention to the entry and exit signs. The reef here is beautiful but unforgiving if you step on it. Always enter and exit where the signs tell you to." },
      { type: "heading", text: "Marine life" },
      { type: "paragraph", text: "One of the genuinely magical things about kiting at Atlantis Beach is the wildlife. Dolphins are regular visitors. Sea turtles pass through constantly. Respect them — keep your distance, don't chase them, and slow down when they're nearby. Some species are legally protected. None of them need a kite overhead." },
      { type: "heading", text: "The wind" },
      { type: "paragraph", text: "The forecast is your bible. Check it the morning of your session and again an hour before you go out. At Atlantis Beach we ride with east wind — this gives the flat water conditions the spot is famous for. If the wind shifts significantly or gusts become unpredictable, get off the water. Bonaire has 300+ wind days a year. There will be another session." },
      { type: "tip", text: "At Kiteboarding Bonaire we always have a rescue boat in the water during operating hours. If you're unsure about conditions, ask us before you go out." },
    ],
  },
  {
    slug: "how-to-perform-self-rescue",
    title: "Self Rescue in Kitesurfing: A Step-by-Step Guide",
    excerpt: "Every kiteboarder should know how to get themselves safely back to shore without outside help. Here's how to do it in six clear steps.",
    date: "2023-02-04",
    readTime: "4 min",
    category: "Safety",
    content: [
      { type: "intro", text: "Self rescue is not a last resort skill. It's a fundamental. Every rider should know how to do it before they go out alone, regardless of experience level. Here's the sequence." },
      { type: "heading", text: "Step 1. Stay calm" },
      { type: "paragraph", text: "This is not a throwaway instruction. Panic makes every physical skill harder and every decision worse. When something goes wrong — kite crashes, you get separated from your board, equipment fails — stop. Breathe. Assess. Your body knows what to do if your brain gives it a chance." },
      { type: "heading", text: "Step 2. Activate your safety system" },
      { type: "paragraph", text: "If the kite is pulling you somewhere dangerous or you can't depower it, pull your quick release. The kite will depower immediately. This is what the system is designed for. Don't hesitate to use it." },
      { type: "heading", text: "Step 3. Retrieve your kite" },
      { type: "paragraph", text: "Once the kite is depowered and safe, gather your lines. Wrap the back lines around your hands as you swim towards the kite. Keep the kite in a neutral position — don't let it reinflate or catch wind again. Work slowly and deliberately." },
      { type: "heading", text: "Step 4. Secure the kite to your body" },
      { type: "paragraph", text: "Wrap the back lines around your chest or waist so the kite trails behind you. The kite becomes your sail — it will help pull you back toward shore if the wind is in the right direction. If not, it keeps the kite from drifting away while you swim." },
      { type: "heading", text: "Step 5. Retrieve your board" },
      { type: "paragraph", text: "If your board is nearby, swim to it. Use it to rest and give yourself more buoyancy. If it's too far, prioritise the kite and your safety. The board can be recovered. You can't." },
      { type: "heading", text: "Step 6. Get back to shore" },
      { type: "paragraph", text: "Use the kite as a drag sail if conditions allow. Otherwise, swim at a controlled pace toward shore. Signal for help if needed — wave one arm overhead, repeatedly. At Atlantis Beach, our rescue boats are on the water during operating hours. We will come to you." },
      { type: "tip", text: "Practice self rescue in shallow water during your lessons with us. It's much easier to learn it in a controlled environment than to figure it out when you actually need it." },
    ],
  },
  {
    slug: "kiteboarding-rules-at-atlantis-beach",
    title: "The Rules of Kiteboarding at Atlantis Beach",
    excerpt: "Atlantis Beach has specific rules that keep everyone safe and the sessions running smoothly. If you're riding here, know these before you go out.",
    date: "2023-02-02",
    readTime: "3 min",
    category: "Safety",
    content: [
      { type: "intro", text: "Kitesurfing is a free sport, but it's not a lawless one. These rules exist because they work. They keep the beach safe, the water pleasant and the vibe good for everyone." },
      { type: "heading", text: "Wear your safety gear, every session" },
      { type: "paragraph", text: "Helmet, impact vest, quick-release harness — every time. This isn't negotiable at Kiteboarding Bonaire and it shouldn't be negotiable anywhere. The equipment exists to protect you. Use it." },
      { type: "heading", text: "Know the entry and exit points" },
      { type: "paragraph", text: "Atlantis Beach has specific zones for entering and exiting the water. The reef here is shallow and beautiful — step on it wrong and you'll remember it. Follow the signs. Always." },
      { type: "heading", text: "Respect right of way" },
      { type: "paragraph", text: "The kiter on the water has right of way over the kiter in the air. Downwind gives way to upwind. The rider entering the water has right of way over the rider exiting. These rules are universal in kitesurfing. Learn them before your first session." },
      { type: "heading", text: "Never launch or land near people" },
      { type: "paragraph", text: "A kite being launched is an unpredictable object. Clear the area, get an assistant, and communicate before you launch. If you're alone and unsure, come to the Blue Bus and we'll help you." },
      { type: "heading", text: "Know your limits and ride them" },
      { type: "paragraph", text: "Atlantis Beach sees world-class riders. It also sees absolute beginners. Both can coexist safely when everyone rides within their actual ability level, not their aspirational one. If the conditions are beyond you today, that's not failure — it's judgement. Come back tomorrow." },
      { type: "heading", text: "No kitesurfing in restricted zones" },
      { type: "paragraph", text: "Bonaire is a marine park. Some areas are protected, some are reserved for swimmers and divers. These restrictions are enforced and the fines are real. Check the beach signs and ask us if you're unsure." },
      { type: "tip", text: "The beach community at Atlantis is genuinely welcoming. If you're new, introduce yourself. Someone will show you how it all works here." },
    ],
  },
  {
    slug: "how-to-do-a-pop-in-kitesurfing",
    title: "How to Do a Pop in Kitesurfing",
    excerpt: "The pop is the foundation of kitesurfing freestyle. Before you jump with the kite, you need to learn to jump off the board. Here's the breakdown.",
    date: "2023-02-02",
    readTime: "4 min",
    category: "Technique",
    content: [
      { type: "intro", text: "Before you chase big air with the kite, you need a solid pop. The pop is an unassisted jump off the water — board edge, body drive, no kite power. Get this right and every other jump builds on it." },
      { type: "heading", text: "What a pop actually is" },
      { type: "paragraph", text: "A pop is generated entirely by the board and your body. You edge hard against the water, load tension into the board, then release it upward in one sharp movement. The kite holds your position in the wind window but doesn't provide lift. That comes from you." },
      { type: "heading", text: "Body position before the pop" },
      { type: "paragraph", text: "Ride upwind at moderate speed. Weight over your back foot, slightly crouched, board edged hard into the water. Arms straight holding the bar at your hips — not pulled in, not extended. Look at the horizon, not down at the board." },
      { type: "heading", text: "The load and pop" },
      { type: "paragraph", text: "Increase your edge progressively for 2–3 seconds. You'll feel the board loading against the water. Then: straighten your back leg sharply, drive your front knee up toward your chest, and pull the bar slightly in. The board pops off the water and you go up." },
      { type: "heading", text: "In the air" },
      { type: "paragraph", text: "Keep both knees pulled up. Board flat or angled slightly. Bar held steady at your hips. Look forward. The pop is quick — you won't be up there long at first, and that's fine." },
      { type: "heading", text: "Landing" },
      { type: "paragraph", text: "Spot your landing early. Extend your legs slightly, weight toward your back foot, board slightly downwind. Absorb the impact through bent knees. Don't straighten your legs on touchdown — that's how ankles complain." },
      { type: "tip", text: "Practice on flat water in light wind first. The pop should feel natural before you start adding kite movement. If you're throwing the kite back to go up, you're not really popping — you're just jumping. The pop comes first." },
    ],
  },
  {
    slug: "how-to-ride-upwind",
    title: "How to Stay Upwind While Kitesurfing",
    excerpt: "Riding upwind is the skill that makes you independent on the water. At Atlantis Beach — an offshore spot — it's not optional. Here's how to build it.",
    date: "2023-02-02",
    readTime: "5 min",
    category: "Technique",
    content: [
      { type: "intro", text: "Atlantis Beach is an offshore wind spot. That means the wind blows from the land toward the sea. It makes for perfect flat water conditions. It also means that if you can't ride upwind, you'll slowly drift away from the beach. This is why upwind riding is a core focus in every lesson we run." },
      { type: "heading", text: "Why upwind matters here specifically" },
      { type: "paragraph", text: "At most beach break spots, a downwind drift still brings you back toward shore. At Atlantis Beach, downwind is out to sea. Our rescue boats are always on the water, so you're never in danger — but learning to ride upwind means you ride independently, which is the whole point." },
      { type: "heading", text: "1. Board speed is the foundation" },
      { type: "paragraph", text: "You cannot ride upwind without sufficient board speed. Too slow and the wind wins. Work on generating and maintaining speed before you worry about direction. Flat water, moderate wind, just ride fast and straight first." },
      { type: "heading", text: "2. Edge your board" },
      { type: "paragraph", text: "To go upwind, dig your heelside edge into the water. Shift your weight back, lean against the kite, and push the board at an angle into the wind. The edge creates resistance against the water that converts your speed into upwind progress." },
      { type: "heading", text: "3. Keep the kite at 45 degrees" },
      { type: "paragraph", text: "Park your kite at 10 or 2 o'clock (depending on which direction you're riding). This position generates consistent pull without lifting you out of the water. Moving the kite too far forward kills upwind progress. Too far back and you get pulled sideways." },
      { type: "heading", text: "4. Body position" },
      { type: "paragraph", text: "Arms straight, bar at hip height. Lean back against the kite — use the pull as a counterforce rather than fighting it. Hips forward, back straight. The posture should feel like you're sitting in an invisible chair being dragged across the water." },
      { type: "heading", text: "5. It takes time" },
      { type: "paragraph", text: "Most riders get their first upwind progress between sessions 3 and 5. Some click it earlier. Don't rush it. Every session at Atlantis Beach, whether or not you feel like you're improving, is building the muscle memory and feel that makes it happen." },
      { type: "tip", text: "A good benchmark: if you can return to your launch point without walking back along the beach, you're riding upwind. Set that as your session goal and work toward it." },
    ],
  },
  {
    slug: "10-essential-kitesurfing-skills",
    title: "10 Skills Every Kitesurfer Needs to Develop",
    excerpt: "Kitesurfing rewards the complete rider. Here are the ten core skills that separate someone who can kite from someone who kites well.",
    date: "2023-02-02",
    readTime: "5 min",
    category: "Technique",
    content: [
      { type: "intro", text: "Learning to kitesurf isn't a single skill — it's a collection of them that eventually connect. Here are the ten that matter most, roughly in the order you'll develop them." },
      {
        type: "numbered",
        items: [
          "Kite control. Fly the kite with both hands, one hand, in different wind strengths. Everything else depends on this.",
          "Body dragging. Before the board comes out, you need to be able to drag yourself through the water using only kite power. This is how you recover your board after a fall.",
          "Water starts. Getting up on the board from the water is the milestone every beginner is working toward. It requires kite timing, body position and commitment all happening at once.",
          "Riding upwind. The ability to make progress against the wind direction. Essential at offshore spots like Atlantis Beach.",
          "Kite launching and landing. Safe, controlled take-offs and put-downs. You need an assistant for this — know the hand signals.",
          "Self rescue. Getting yourself back to shore without outside help. Every rider should know this before they go out alone.",
          "Edge control. Using the board's edge to manage speed and direction. The difference between riding the board and driving it.",
          "Transitions. Changing direction without stopping. The foundation of riding continuously rather than doing short runs.",
          "Jumps. Starting with small, controlled hops. Height comes later. First comes consistency.",
          "Wind and weather reading. Understanding what the conditions are doing and what they're about to do. This becomes more important the more independently you ride.",
        ],
      },
      { type: "tip", text: "IKO Level 3 covers skills 1 through 4. If you can check those off, you can rent gear at kite schools worldwide and ride independently. That's the first real milestone." },
    ],
  },
  {
    slug: "spotguide-atlantis-beach-bonaire",
    title: "Spot Guide: Kitesurfing at Atlantis Beach, Bonaire",
    excerpt: "Everything you need to know about the spot. Wind, water, reef, access, wildlife and what makes Atlantis Beach one of the best kite spots in the world.",
    date: "2020-10-28",
    readTime: "6 min",
    category: "Spot Guide",
    content: [
      { type: "intro", text: "Atlantis Beach has been the home of Kiteboarding Bonaire since 2001. It's where we've taught thousands of riders. Here's everything you need to know about the spot." },
      { type: "heading", text: "The wind" },
      { type: "paragraph", text: "Atlantis Beach is a side-offshore kite spot. The trade winds blow from the east and northeast, running parallel to the beach with a slight offshore angle. This does two things: it keeps the water completely flat, and it means that riding upwind is essential. The wind is consistent, averaging 15 to 26 knots, and Bonaire sees over 300 wind days per year. The best season is December through July, when the trades are most reliable." },
      { type: "heading", text: "The water" },
      { type: "paragraph", text: "Flat. Warm — 27°C year round. Protected from Atlantic swell by the island's position. Over 90% of days, the water at Atlantis Beach is completely flat. For kitesurfers, this is rare. Most spots have chop, swell, or current to deal with. Here you can focus entirely on your riding without fighting the water." },
      { type: "heading", text: "The reef" },
      { type: "paragraph", text: "Bonaire is a world-famous dive destination for a reason. The reef at Atlantis Beach is shallow and close to shore. Follow the entry and exit signs on the beach — always. Step on the reef and you'll cut your feet. Ignore the signs and you'll hit the reef with the board. Both outcomes are avoidable." },
      { type: "heading", text: "Getting there" },
      { type: "paragraph", text: "Atlantis Beach is in the south of the island, off the main coastal road. Follow the EEG Boulevard south from Kralendijk. The beach is clearly signposted and you'll see the kites from the road. Parking is on the roadside. The Blue Bus is right on the beach." },
      { type: "heading", text: "Wildlife" },
      { type: "paragraph", text: "Dolphins are common at Atlantis Beach — you may well share a session with them. Sea turtles are everywhere in Bonaire's waters. Flamingos are visible from the beach along the salt flats to the south. This is a protected marine park. Respect it." },
      { type: "heading", text: "Facilities" },
      { type: "paragraph", text: "The Blue Bus provides shade, chairs, equipment storage, an air compressor, and WiFi. Rescue boats operate during our opening hours. If you're arriving as an independent rider, come say hello — we'll brief you on conditions and let you know if there are any hazards to be aware of that day." },
      { type: "tip", text: "Best time of day: morning sessions typically see the smoothest conditions. The wind often picks up and becomes slightly gustier in the afternoon. Arrive early, ride long." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return posts.slice(0, count);
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, count);
}
