// original lines 1432-1520
const lastWords = [
`"Wait... {killer}? But why would you—" *THUD*`,
`"I knew I should have stayed home and binge-watched The Office!" *gurgling sounds*`,
`"This is just like that movie we watched last week!" *screaming*`,
`"Mom always said don't trust anyone... guess she was right." *choking*`,
`"But we're supposed to be friends! We had study group together!" *gasping*`,
`"I always thought I'd die from something cooler, like skydiving!" *whimpering*`,
`"Please, I'll do anything! I'll even delete my TikTok!" *sobbing*`,
`"You're making a huge mistake! I have terrible Yelp reviews to write!" *coughing up blood*`,
`"I should have listened to my gut feeling... and my horoscope..." *dying breath*`,
`"This is so not going in my Instagram story!" *final gasp*`,
`"Wait, can I at least post one last selfie?" *choking*`,
`"I haven't even finished watching Stranger Things yet!" *gasping*`,
`"My mom is going to be SO mad about this!" *wheezing*`,
`"I was supposed to return my library books tomorrow!" *struggling*`,
`"Tell my followers I died doing what I loved... being dramatic!" *theatrical death*`
];

const finalWords = [
`"At least... the others... will make it..." - {victim}, with their dying breath`,
`"Tell my family... I tried to be brave..." - {victim}, fading away`,
`"Don't let... this be... for nothing..." - {victim}, looking at the other survivors`,
`"I'm sorry... I couldn't... protect everyone..." - {victim}, tears in their eyes`,
`"Make sure... they pay... for what they've done..." - {victim}, determined to the end`,
`"It's up to you now... finish this..." - {victim}, passing the torch`,
`"I'm not afraid... anymore..." - {victim}, finding peace`,
`"Remember me... as I lived... not how I died..." - {victim}, smiling weakly`
];

const survivorLines = [
`"{witness}! The killer just tried to turn me into human confetti!" - {victim}, bleeding but alive.`,
`"I always knew my self-defense classes would pay off! Eat that, murderer!" - {victim}, adrenaline pumping.`,
`"Note to self: next party, bring mace AND a rocket launcher!" - {victim}, catching their breath.`,
`"This is why I have trust issues! And why I'm switching to online shopping!" - {victim}, hands shaking.`,
`"I think I just used up all my luck for the next five years!" - {victim}, looking around frantically.`,
`"That was like a really violent episode of home improvement!" - {victim}, wiping blood.`,
`"I'm definitely writing a scathing Yelp review about this place!" - {victim}, still in shock.`,
`"Who knew gardening tools could be so terrifying?!" - {victim}, breathing heavily.`,
`"I survived! Take that, Final Destination!" - {victim}, pumping their fist.`,
`"My mom always said I was a fighter. Guess she was right!" - {victim}, proud but terrified.`,
`"I feel like I'm in a horror movie... oh wait, I AM in a horror movie!" - {victim}, realizing.`,
`"Someone needs to call 911... if anyone still has cell service!" - {victim}, checking their phone.`,
`"I'm never watching another slasher film after this!" - {victim}, traumatized.`,
`"Is it weird that I'm kind of proud of myself right now?" - {victim}, conflicted.`,
`"I think I pulled something during that fight. Do we have any ice?" - {victim}, checking for injuries.`,
`"Well, that's going to need therapy. Like, a LOT of therapy." - {victim}, processing.`,
`"I fought a serial killer and lived! That's definitely going on my resume!" - {victim}, oddly excited.`,
`"Mental note: learn karate. Also, buy pepper spray. And maybe a tank." - {victim}, planning ahead.`,
`"I can't wait to trauma-dump about this in therapy!" - {victim}, surprisingly upbeat.`,
`"That was more cardio than I've done all year!" - {victim}, out of breath.`
];

const killerSpeeches = [
"You all thought you were so perfect, so untouchable. But I showed you the truth!",
"Every cut, every scream was for my brother! You destroyed my family!",
"This isn't a movie, it's real life. And in real life, the killer wins!",
"You never even noticed me, did you? Well, you'll remember me now!",
"I gave you all a chance to confess, but you chose to stay silent. Now you pay!",
"The game was rigged from the start. You were never going to survive!",
"You pathetic insects! You think your precious friendship can save you now?",
"All those years of humiliation, of being ignored... THIS is my revenge!",
"I am the shadow that follows, the nightmare that haunts! You cannot escape me!",
"Your blood will paint these walls red! Justice demands sacrifice!",
"I am become death, destroyer of your miserable little world!",
"You laughed at me, mocked me, cast me aside! Now who's laughing?!",
"Every breath you take from this moment on is borrowed time!",
"I have become something beyond your comprehension - pure vengeance!",
"You created this monster! Now face the consequences of your cruelty!",
"Death is too good for you! But it's all I can offer in this fleeting life!",
"I am the reckoning you never saw coming! The bill for your sins!",
"Your screams are music to my ears! Symphony of suffering!",
"I tried to be good, to fit in... but you showed me that evil is the only truth!",
"Welcome to my masterpiece! Each death, a brushstroke in my art of revenge!"
];

const killerMotives = [
`{killer} discovered that {victim} was responsible for spreading rumors that ruined their reputation and caused their family to disown them.`,
`{killer} blamed the group for their younger sibling's suicide after being bullied by the popular kids.`,
`{killer} was being blackmailed by {victim} who had evidence of a dark secret from their past.`,
`{killer} was seeking revenge for a car accident that killed their best friend, believing the victims were responsible.`,
`{killer} felt betrayed and abandoned by their so-called friends who never supported them when they needed it most.`
];
