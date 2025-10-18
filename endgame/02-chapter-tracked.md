# Chapter 2: BEING WATCHED
## The Eyes Everywhere

---

### The Hunter and the Hunted

By 2012, Osairon was seventeen and had become obsessed with understanding one thing: **How exactly are we being watched?**

It wasn't enough to know that surveillance existed. He needed to understand the mechanics, the protocols, the infrastructure. He needed to see through the eyes of his watchers. Only then could he learn to hide.

So he did something dangerous: he started cataloging surveillance methods.

Late at night, using a laptop configured with multiple layers of protection, Osairon would probe Iran's internet infrastructure. Not to attack it—he was smarter than that. But to understand it. To map it. To see how the machine worked.

What he discovered was both terrifying and illuminating.

---

### The Three Watchers

Iran's internet surveillance wasn't one monolithic system—it was three separate entities, each with their own methods, each watching from different angles.

**THE ISP (Internet Service Provider)**  
First watcher: The telecommunications company itself. Every packet that entered or left Iran went through them. They saw everything: source, destination, content if unencrypted. They logged it all. Some traffic was automatically flagged for review. Some was stored indefinitely.

Osairon imagined them as a steady, relentless presence—not malicious, just doing what they were told. Watching. Recording. Reporting.

**THE CYBER POLICE**  
Second watcher: The government's dedicated internet monitoring force. They didn't just passively watch—they actively hunted. They infiltrated forums, posed as dissidents, tracked down people who spoke against the regime. They were aggressive, fast, and always hungry for their next target.

Osairon pictured them as predators circling, waiting for someone to make a mistake.

**THE HACKERS (Government-Sponsored)**  
Third watcher: The most dangerous of all. Iranian intelligence had recruited some of the country's best hackers and turned them into weapons. These weren't bureaucrats—they were people like Osairon, except they'd chosen the other side. They could break into systems, trace supposedly anonymous users, and deploy zero-day exploits.

They were the chaotic element—unpredictable, skilled, and terrifying.

---

### The Tracking Techniques

Osairon spent months researching and testing how the three watchers operated. He set up virtual machines, used sacrificial accounts, and carefully documented everything. His notes filled hundreds of pages.

Here's what he learned:

**Deep Packet Inspection (DPI)**  
The ISPs didn't just see where traffic was going—they could read the content of unencrypted packets. Every HTTP request. Every plain-text email. Every file download. The packets were inspected, analyzed, and sorted in real-time.

Keywords triggered alerts: "freedom," "protest," "VPN," "proxy," certain names, certain websites.

**DNS Poisoning**  
When you typed a website address, the system could lie to you. Instead of connecting to the real site, you'd be redirected to a fake one—or to a page showing it was blocked. Sometimes you wouldn't even know it was happening.

**Behavioral Analysis**  
The Cyber Police used machine learning (before it was trendy) to detect "suspicious patterns." Someone suddenly using more bandwidth? Flagged. Someone connecting at unusual hours? Flagged. Someone whose browsing patterns changed dramatically? Investigated.

**Network Timing Attacks**  
The hackers were even more sophisticated. They could identify VPN users by analyzing timing patterns in encrypted traffic. Even if they couldn't read the content, they could tell you were hiding something—and that alone was suspicious.

---

### Living in the Panopticon

Osairon realized he was living in a digital panopticon—Jeremy Bentham's prison design where inmates never knew when they were being watched, so they had to assume they were always being watched.

The genius of the system wasn't that it caught everyone—it was that it made everyone afraid. Fear was the real control mechanism.

He watched people around him self-censor. He saw friends avoid certain topics in emails. He heard family members speak in code on the phone. The surveillance didn't need to be perfect—it just needed to be present. The threat alone was enough.

But knowing this filled Osairon with rage.

*This is psychological warfare,* he wrote in his journal. *They've weaponized fear itself.*

---

### The First Breakthrough

Late one night, after weeks of analysis, Osairon had an epiphany.

The watchers were powerful, but they had a fundamental weakness: **They were looking for patterns. They were looking for behavior that stood out.**

The hackers who got caught were the ones who did obvious things: using simple proxies, visiting blocked websites directly, using banned software openly.

But what if you could hide in plain sight? What if your encrypted traffic looked like normal traffic? What if you could blend into the noise?

Osairon started experimenting with a concept called "traffic obfuscation"—making VPN traffic look like normal HTTPS traffic. The watchers would see encrypted data, but they wouldn't be able to tell if it was a video call to a family member or a connection to a banned website.

It was like camouflage. Digital camouflage.

His first prototype was crude—just a modified OpenVPN configuration with some traffic shapingscripts. But when he tested it, something magical happened:

It worked.

For the first time in his life, Osairon accessed blocked content without the connection being immediately severed. The watchers saw the traffic, but they didn't know what it was. He was invisible in plain sight.

He sat back in his chair, heart pounding, and whispered: "I can do this. I can actually do this."

---

### The Cost of Knowledge

But every victory came with a price.

The more Osairon learned, the more paranoid he became. He saw surveillance everywhere. He stopped using his real name online. He cycled through multiple email accounts. He encrypted everything. He trusted no one.

His friends thought he was weird. "Why are you so paranoid?" they'd ask. "You're not doing anything illegal."

But Osairon knew better. In a surveillance state, you don't have to do anything illegal to become a target. You just have to want privacy. You just have to want freedom. That alone makes you suspicious.

He remembered reading about Salman Rushdie's quote: "What is freedom of expression? Without the freedom to offend, it ceases to exist."

In Iran, the freedom to even want freedom was dangerous.

---

### The Network Emerges

Osairon wasn't alone in his discoveries. Across Iran, scattered in different cities, other digital warriors were fighting the same fight. Most worked alone, paranoid and isolated. But occasionally, carefully, they would find each other.

In encrypted IRC channels.  
On hidden Telegram groups.  
Through whispered recommendations.

Osairon started connecting with them. A student in Shiraz who'd built a custom DNS resolver. A programmer in Mashhad who specialized in traffic analysis. A hacker in Isfahan who'd breached government systems and documented their security flaws.

They shared knowledge. They tested each other's tools. They warned each other about new blocking techniques.

They never met in person. They never used real names. But they were a network—a shadow network of people fighting for the same thing.

One of them, a user who called himself "Cipher," sent Osairon a message that would stay with him forever:

*"They're watching everyone. But if everyone watches back, who's really in control?"*

---

### The Realization

By early 2013, Osairon understood something profound about surveillance:

It wasn't just about technology. It was about power. About control. About making sure citizens never forgot who was in charge.

But he also understood something else: **The watchers were outnumbered.**

There were millions of Iranians online. There were thousands of Cyber Police. The math didn't work in the government's favor. They couldn't watch everyone, all the time. They could only create the illusion of total surveillance.

If enough people learned to protect themselves...  
If enough people learned to hide...  
If enough people learned to fight back...

The system would crumble.

That's when Osairon's mission evolved. It wasn't enough to protect himself anymore. He needed to protect others. He needed to share his knowledge. He needed to build tools that anyone could use.

But first, he needed to become even better. He needed to stop being good at coding and become great. He needed to stop being a digital refugee and become a digital warrior.

The watchers had been studying him, cataloging his moves, trying to understand him.

Now it was his turn to watch back.

---

### The Escalation

Around this time, Iran's government deployed a new surveillance tool—one even more invasive than before. It was called "National Information Network" (NIN), a parallel internet that gave the government even more control.

The reaction among Osairon's network was panic. Some gave up. Some fled the country. Some decided to stop fighting and just accept their digital imprisonment.

But Osairon felt something different: **Determination.**

*They're escalating,* he thought. *That means we're winning. They wouldn't be building bigger walls if we weren't breaking through their old ones.*

He upgraded his tools. He learned new techniques. He started teaching others through carefully anonymous blog posts and tutorials.

The war was escalating on both sides.

But Osairon was no longer afraid.

He was being watched, yes. They all were. But now he was watching back. And more importantly—he was learning how to make himself unwatchable.

---

### The Promise

Late one night, after helping yet another anonymous person bypass the filters and access information about political prisoners, Osairon made himself a promise:

*One day, I will build something that makes mass surveillance impossible. Not difficult—impossible. I will build a tool so good that even the best watchers cannot trace it. And I will give it away for free.*

*Not for money. For freedom.*

*Not for fame. For the people who have none.*

He didn't know how yet. He didn't know if it was even possible. But he knew one thing: he had to try.

Because every day that passed, more people were being watched. More people were being afraid. More people were giving up.

And Osairon refused to let fear win.

---

*"They can watch everything. But they cannot stop everyone."*  
— Osairon's Notes, 2013

---

**End of Chapter 2**

The watchers were powerful. But Osairon was learning. And knowledge, wielded correctly, is the ultimate weapon.

*Next: Chapter 3 - Blocked*



