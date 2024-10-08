import { useEffect, useState } from "react";
import { GiGoose } from "react-icons/gi";
import Faculty from "@/components/Faculty";

type GooseSchema = {
    id: number;
    name: string;
    image: string;
    traitsPrompt: string;
    views: number;
    finder: string;
    midterm: number;
    final: number;
    program: string;
    quote: string;
};


function quoteGoose(gradeTest: number) {
    const randNum = Math.trunc(Math.random() * 88);
    if (gradeTest <= 100 && gradeTest >= 80) {

         const verySmartQuotes = [
            "The roots of education are bitter, but the fruit is sweet.",
            "Well begun is half done.",
            "Learning never exhausts the mind.",
            "Small opportunities are often the beginning of great achievements.",
            "It is the mark of an educated mind to entertain a thought without accepting it.",
            "Excellence is never an accident; it is the result of high intention and effort.",
            "Knowing yourself is the beginning of all wisdom.",
            "The only true wisdom is in knowing you know nothing.",
            "He who learns but does not think, is lost. He who thinks but does not learn is in danger.",
            "Pleasure in the job puts perfection in the work.",
            "To know oneself, one must study oneself in action.",
            "It does not matter how slowly you go as long as you do not stop.",
            "The unexamined life is not worth living.",
            "Quality is not an act, it is a habit.",
            "You must expect great things of yourself before you can do them.",
            "He who sweats more in training, bleeds less in war.",
            "The more you know, the more you realize you know nothing.",
            "A journey of a thousand miles begins with a single step.",
            "Fortune favors the bold.",
            "Learning is a treasure that will follow its owner everywhere.",
            "The man who moves a mountain begins by carrying away small stones.",
            "What you do today can improve all your tomorrows.",
            "An ounce of action is worth a ton of theory.",
            "True wisdom comes to each of us when we realize how little we understand.",
            "Success is dependent on effort.",
            "Do not say a little in many words but a great deal in a few.",
            "Patience is bitter, but its fruit is sweet.",
            "The key is to keep company only with people who uplift you.",
            "The greatest wealth is to live content with little.",
            "The secret of change is to focus all your energy not on fighting the old, but on building the new.",
            "Good actions give strength to ourselves and inspire good actions in others.",
            "Be kind, for everyone you meet is fighting a hard battle.",
            "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
            "It is not what happens to you, but how you react to it that matters.",
            "He who is not a good servant will not be a good master.",
            "When we are no longer able to change a situation, we are challenged to change ourselves.",
            "Happiness depends upon ourselves.",
            "No man is free who is not master of himself.",
            "Wealth consists not in having great possessions, but in having few wants.",
            "He who conquers himself is the mightiest warrior.",
            "Man is what he believes.",
            "Courage is the first of human qualities because it is the quality which guarantees the others.",
            "He who has a why to live can bear almost any how.",
            "I count him braver who overcomes his desires than him who conquers his enemies.",
            "To be evenminded is the greatest virtue.",
            "What we achieve inwardly will change outer reality.",
            "It is better to rise from life as from a banquet—neither thirsty nor drunken.",
            "No one is free who has not obtained the empire of himself.",
            "He who is contented is rich.",
            "Act as if what you do makes a difference. It does.",
            "It is not length of life, but depth of life.",
            "Victory belongs to the most persevering.",
            "The more you practice, the luckier you get.",
            "True happiness is found in the unselfish pursuit of excellence.",
            "Seek not good from without; seek it within yourselves.",
            "Let no one ever come to you without leaving better and happier.",
            "The more man meditates upon good thoughts, the better will be his world and the world at large.",
            "He who knows others is wise; he who knows himself is enlightened.",
            "Nothing great was ever achieved without enthusiasm.",
            "The way to gain a good reputation is to endeavor to be what you desire to appear.",
            "To avoid criticism, say nothing, do nothing, be nothing.",
            "Luck is what happens when preparation meets opportunity.",
            "We become what we think about.",
            "The best way to predict the future is to create it.",
            "The only limit to our realization of tomorrow is our doubts of today.",
            "Perfection is not attainable, but if we chase perfection, we can catch excellence.",
            "Do what you can, with what you have, where you are.",
            "Believe you can and you're halfway there.",
            "In the middle of every difficulty lies opportunity.",
            "He that is good for making excuses is seldom good for anything else.",
            "Success is going from failure to failure without losing enthusiasm.",
            "The more difficult the victory, the greater the happiness in winning.",
            "If you want to be happy, be.",
            "It is not how much we have, but how much we enjoy, that makes happiness.",
            "A person who never made a mistake never tried anything new.",
            "Nothing is impossible to him who will try.",
            "Study the past if you would define the future.",
            "Success is how high you bounce when you hit bottom.",
            "Opportunities multiply as they are seized.",
            "It is better to know how to learn than to know.",
            "A fool thinks himself to be wise, but a wise man knows he is a fool.",
            "One who is slack in his work is brother to one who destroys.",
            "No great thing is created suddenly.",
            "The mind is everything. What you think, you become.",
            "The man who has confidence in himself gains the confidence of others.",
            "Our greatest glory is not in never falling, but in rising every time we fall.",
            "Great results cannot be achieved at once; and we must be satisfied to advance in life as we walk."
          ];
        return verySmartQuotes[randNum];
    } else if (gradeTest >= 60) {
        const smartQuotes = [
            "Set specific, achievable goals for each study session.",
            "Take short breaks to keep your mind fresh and focused.",
            "Drink water and stay hydrated during study sessions.",
            "Summarize key points in your own words for better understanding.",
            "Avoid cramming—spread studying over several days.",
            "Sleep well to allow your brain to consolidate information.",
            "Reward yourself after completing study milestones.",
            "Don’t hesitate to ask for help when stuck on difficult topics.",
            "Use a timer to stay on track during study sessions.",
            "Find a study partner to share ideas and quiz each other.",
            "Study in intervals and rotate subjects to avoid burnout.",
            "Review previous lessons regularly to keep knowledge fresh.",
            "Use spaced repetition to strengthen memory over time.",
            "Read aloud when you’re struggling to understand something.",
            "Stay positive and don’t get discouraged by setbacks.",
            "Keep your phone on silent to avoid distractions.",
            "Study with clear, specific intentions, not vague goals.",
            "Organize study materials the night before a study session.",
            "Eliminate unnecessary apps and websites while studying.",
            "Take handwritten notes to engage your brain more actively.",
            "Visualize what you're learning to help it stick.",
            "Use diagrams and mind maps to connect ideas visually.",
            "Change study locations to enhance focus and retention.",
            "Explain complex ideas as simply as possible to test your understanding.",
            "Practice problems or exercises regularly for subjects like math or science.",
            "Track your progress to stay motivated and focused.",
            "Listen to instrumental music if it helps you concentrate.",
            "Stay consistent with your study habits for long-term success.",
            "Break large projects into smaller, manageable tasks.",
            "Learn how to manage stress effectively during exams.",
            "Take deep breaths or meditate to reset during study breaks.",
            "Skim chapters before diving deep for an overview of the material.",
            "Sleep well before exams to boost performance.",
            "Limit caffeine intake—it can increase anxiety and harm focus.",
            "Create study guides to condense and simplify information.",
            "Study at your peak energy times—know when you're most productive.",
            "Stay curious and engaged with what you're learning.",
            "Use past exam papers to familiarize yourself with question formats.",
            "Stay adaptable—adjust your study methods if something isn’t working.",
            "Use real-world examples to make abstract ideas more relatable.",
            "Reward yourself with small treats after productive study sessions.",
            "Prioritize difficult topics earlier in the day when you’re most alert.",
            "Use mnemonics or memory aids to remember tricky details.",
            "Find a comfortable but not too cozy study space.",
            "Mix different types of learning methods, like reading, writing, and speaking.",
            "Turn off notifications on all devices during study time.",
            "Review mistakes and learn from them after practice tests.",
            "Set deadlines for yourself to stay accountable.",
            "Take notes in your own words rather than copying verbatim.",
            "Plan review sessions before exams, not just new material.",
            "Write down any questions that arise during studying and seek answers later.",
            "Stay away from social media when it’s time to focus.",
            "Have a set routine to avoid procrastination.",
            "Stay persistent, even when progress feels slow.",
            "Use a study app to help manage time and productivity.",
            "Reflect on what you've learned after each session.",
            "Prioritize quality study time over quantity.",
            "Use online resources to supplement difficult topics.",
            "Review your syllabus regularly to stay on top of deadlines.",
            "Experiment with different study techniques to find what works best.",
            "Stay mindful of posture and take breaks to move around.",
            "Join study groups to discuss and share knowledge.",
            "Stay calm and don’t panic if you feel behind—just start where you can.",
            "Create a habit of reviewing each class’s material after it’s taught.",
            "Challenge yourself with harder problems or tasks once you master basics.",
            "Focus on understanding key concepts before getting into details.",
            "Stay open to learning from your mistakes.",
            "Use bookmarks or sticky notes to mark important pages in textbooks.",
            "Stay accountable by telling someone your study goals.",
            "Review multiple sources for a broader perspective on a topic.",
            "Listen to educational podcasts to reinforce what you're learning.",
            "Block out specific times on your calendar for studying.",
            "Avoid perfectionism—just keep moving forward.",
            "Engage in discussions on the subject to deepen your knowledge.",
            "Don’t compare your study pace to others—go at your own speed.",
            "Limit late-night study sessions; get plenty of rest instead.",
            "Use practice exams to simulate test conditions.",
            "Write summaries or essays on the material to reinforce learning.",
            "Practice gratitude to keep stress in perspective.",
            "Change your study technique if something isn’t working.",
            "Create acronyms for lists or steps to make them easier to remember.",
            "Set aside time for self-care to avoid burnout.",
            "Write down your long-term study goals to stay motivated.",
            "Create visual aids like charts and graphs for complex information.",
            "Reflect on your study habits and adjust them as needed.",
            "Learn from others, but don’t compare their progress to yours.",
            "Take frequent breaks to refresh your mind and body."
          ];          
        return smartQuotes[randNum];
    } else if (gradeTest >= 40) {
        const quotes =[
            "Honk! Avoid distractions by turning off your phone while studying.",
            "Honk! Take short breaks to avoid burnout.",
            "Honk! Stay hydrated to keep your brain functioning well.",
            "Honk! Summarize your notes in your own words.",
            "Honk! Study a little each day instead of cramming.",
            "Honk! Get plenty of sleep before a big study session.",
            "Honk! Set small, achievable study goals.",
            "Honk! Ask for help if you don’t understand something.",
            "Honk! Use a timer to keep yourself focused on tasks.",
            "Honk! Study with a buddy to stay motivated.",
            "Honk! Review old material often to keep it fresh.",
            "Honk! Take notes by hand to help remember better.",
            "Honk! Stay positive and don’t give up when it gets tough.",
            "Honk! Organize your study space for better focus.",
            "Honk! Use colorful pens or highlighters to organize your notes.",
            "Honk! Use diagrams to visualize complex information.",
            "Honk! Explain tricky concepts to yourself out loud.",
            "Honk! Start with hard topics when your mind is fresh.",
            "Honk! Create a study guide to review key points easily.",
            "Honk! Don’t multitask—focus on one thing at a time.",
            "Honk! Take deep breaths if you start feeling overwhelmed.",
            "Honk! Use practice exams to prepare for tests.",
            "Honk! Stick to a study routine every day.",
            "Honk! Stay curious and enjoy what you're learning.",
            "Honk! Keep track of your progress to stay motivated.",
            "Honk! Avoid distractions by studying in a quiet place.",
            "Honk! Take breaks to recharge your brain.",
            "Honk! Use real-world examples to make studying more fun.",
            "Honk! Stay consistent with your study habits.",
            "Honk! Rewrite your notes to reinforce your learning.",
            "Honk! Use flashcards to review important information quickly.",
            "Honk! Mix up study methods to keep it interesting.",
            "Honk! Stay calm during exams by practicing deep breathing.",
            "Honk! Skim material before diving into deep study.",
            "Honk! Organize study material before each session.",
            "Honk! Set a timer to stay focused on study tasks.",
            "Honk! Avoid last-minute cramming before exams.",
            "Honk! Focus on understanding concepts, not just memorizing facts.",
            "Honk! Use spaced repetition to remember things longer.",
            "Honk! Study during the time of day when you’re most alert.",
            "Honk! Explain complex ideas in simple terms to understand them better.",
            "Honk! Challenge yourself with harder questions once you master basics.",
            "Honk! Avoid social media during study time.",
            "Honk! Write down any questions to review later.",
            "Honk! Take short walks during study breaks to clear your mind.",
            "Honk! Use online resources to help with difficult topics.",
            "Honk! Stay flexible and adjust your study plan when needed.",
            "Honk! Focus on quality, not just quantity, of study time.",
            "Honk! Use mnemonic devices to remember tricky information.",
            "Honk! Review past lessons regularly to keep knowledge fresh.",
            "Honk! Find a study buddy to quiz each other.",
            "Honk! Keep your phone away while studying for less distraction.",
            "Honk! Stay organized by breaking down big tasks into smaller steps.",
            "Honk! Visualize what you're learning to help retain information.",
            "Honk! Take care of your body with exercise and healthy food.",
            "Honk! Set realistic study goals to avoid stress.",
            "Honk! Reward yourself after completing study sessions.",
            "Honk! Review your syllabus to stay on top of deadlines.",
            "Honk! Focus on your weakest subjects first.",
            "Honk! Review mistakes after tests to learn from them.",
            "Honk! Stay persistent even if progress feels slow.",
            "Honk! Study in a different location to stay energized.",
            "Honk! Stay accountable by sharing your study goals with others.",
            "Honk! Use study apps to track your time and progress.",
            "Honk! Get enough rest to boost focus and retention.",
            "Honk! Write summaries to capture key ideas.",
            "Honk! Use a whiteboard to map out big ideas visually.",
            "Honk! Mix up study methods to keep things interesting.",
            "Honk! Stay calm and pace yourself during long study sessions.",
            "Honk! Use old exam papers to practice under timed conditions.",
            "Honk! Avoid perfectionism, just aim for progress.",
            "Honk! Take short notes during lectures for better recall.",
            "Honk! Start studying early to avoid last-minute stress.",
            "Honk! Practice mindfulness to reduce stress while studying.",
            "Honk! Stay curious and enjoy the learning process.",
            "Honk! Learn from your mistakes and don’t be discouraged.",
            "Honk! Study in intervals for better focus and retention.",
            "Honk! Write down key points after each study session.",
            "Honk! Stay on top of deadlines with a well-planned calendar.",
            "Honk! Prioritize studying difficult topics when you're most alert.",
            "Honk! Get up and move around during study breaks.",
            "Honk! Review study material before bed for better retention.",
            "Honk! Practice gratitude to manage stress during busy times.",
            "Honk! Stay consistent with your study routine.",
            "Honk! Use sticky notes to mark important pages in textbooks.",
            "Honk! Reflect on your progress to adjust your study habits.",
            "Honk! Celebrate small victories to stay motivated."
          ];          
        return quotes[randNum];
    } else if (gradeTest < 40) {
        const lessSmartQuotes = [
            "Honk! Keep being awesome!",
            "Honk! Wow, so smart!",
            "Honk! Let’s keep going!",
            "Honk! You’re so strong!",
            "Honk! Keep it up!",
            "Honk! You’re amazing!",
            "Honk! Keep trying, yay!",
            "Honk! You can win!",
            "Honk! Yay, great job!",
            "Honk! Learning is fun!",
            "Honk! You’re super smart!",
            "Honk! Wow, keep trying!",
            "Honk! You’re a star!",
            "Honk! Great work, yay!",
            "Honk! You’re the best!",
            "Honk! Yay, keep going!",
            "Honk! You’re doing it!",
            "Honk! Go, smart friend!",
            "Honk! You’re so great!",
            "Honk! Wow, so good!",
            "Honk! You got it!",
            "Honk! Let’s keep learning!",
            "Honk! Wow, so fast!",
            "Honk! You’re super cool!",
            "Honk! Yay, awesome work!",
            "Honk! You’re a genius!",
            "Honk! Keep being great!",
            "Honk! You can learn!",
            "Honk! Yay, go, go!",
            "Honk! Yay, so clever!",
            "Honk! Wow, so smart!",
            "Honk! Keep being brave!",
            "Honk! You’re awesome!",
            "Honk! Let’s study more!",
            "Honk! You’re so bright!",
            "Honk! Yay, keep going!",
            "Honk! Yay, keep trying!",
            "Honk! Yay, go learn!",
            "Honk! Wow, good job!",
            "Honk! You can try!",
            "Honk! Let’s do this!",
            "Honk! You’re fantastic!",
            "Honk! Wow, so good!",
            "Honk! Yay, you got it!",
            "Honk! You’re a hero!",
            "Honk! Keep being you!",
            "Honk! Wow, great job!",
            "Honk! You’re so cool!",
            "Honk! Yay, go study!",
            "Honk! Wow, you’re smart!",
            "Honk! Yay, keep learning!",
            "Honk! Yay, you can!",
            "Honk! You’re so strong!",
            "Honk! Keep going, wow!",
            "Honk! Let’s study more!",
            "Honk! You’re awesome, yay!",
            "Honk! You’re so good!",
            "Honk! Yay, try again!",
            "Honk! You’re super great!",
            "Honk! Let’s keep going!",
            "Honk! Wow, keep learning!",
            "Honk! Yay, keep trying!",
            "Honk! You’re the best!",
            "Honk! Let’s do this!",
            "Honk! Yay, go learn!",
            "Honk! You’re awesome, yay!",
            "Honk! You’re amazing!",
            "Honk! Yay, so smart!",
            "Honk! Let’s learn more!",
            "Honk! Wow, so fast!",
            "Honk! Yay, keep going!",
            "Honk! You’re great, yay!",
            "Honk! Yay, smart friend!",
            "Honk! Wow, so clever!",
            "Honk! You’re so good!",
            "Honk! Yay, keep it up!",
            "Honk! You can do it!",
            "Honk! Yay, keep trying!",
            "Honk! You’re the best!",
            "Honk! Wow, so awesome!",
            "Honk! Let’s learn lots!",
            "Honk! Keep being awesome!",
            "Honk! Wow, keep going!",
            "Honk! You’re doing it!",
            "Honk! You’re fantastic!",
            "Honk! Yay, you’re smart!",
            "Honk! You can win!"
          ];
        return lessSmartQuotes[randNum];
    }
}

export default function Wadcard({ goose }: { goose: GooseSchema }) {
    // const [quote, setQuote] = useState("");
    // useEffect(() => {
    //     async function fetchQuote() {
    //         const quote = await quoteGoose(goose.midterm);
    //         if (quote) {
    //             setQuote(quote.text);
    //         } else {
    //             setQuote("No quote found");
    //         }
    //     }
    //     fetchQuote();
    // });

    function getColour(midterm: number) {
        const red = Math.floor((100 - midterm) * 2.55);
        const green = Math.floor(midterm * 2.55);
        return `rgb(${red}, ${green}, 0)`;
    }

    return (
        <div className="relative w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col">
            <div className="flex justify-start items-center px-4 py-2 bg-blue-900 text-white rounded-t-lg">
                <GiGoose className="text-4xl mr-2 z-50" />
                <span className="text-lg font-bold text-purple-300">WAD</span>
                <span className="text-lg font-bold">CARD</span>
            </div>

            <div className="flex flex-row items-start px-4 py-4 space-x-4">
                <div className="flex flex-col items-center">
                    {/* Goose Image */}
                    <div className="rounded-full border border-gray-300">
                        <img
                            src={goose.image}
                            alt={`${goose.name} sprite`}
                            className="w-24 h-24 object-cover p-4"
                        />
                    </div>
                    <p className="text-black text-center mt-2">
                        University of Waddleloo
                    </p>
                    <div className="mt-2">
                        <Faculty program={goose.program} />
                    </div>
                </div>

                {/* Goose Info */}
                <div className="flex flex-col justify-between h-full">
                    <h2 className="text-xl font-bold text-gray-900 text-center">
                        {goose.name}
                    </h2>
                    {/* Midterm Grade */}
                    <p
                        className="text-xl font-semibold text-center"
                        style={{
                            color: getColour(goose.midterm),
                        }}
                    >
                        Midterm: {goose.midterm}
                    </p>
                    <p
                        className="text-xl font-bold text-center"
                        style={{
                            color: getColour(goose.final),
                        }}
                    >
                        Final: {goose.final}
                    </p>
                    {/* <p className="text-base font-bold text-center">{}</p> */}
                    <p className="text-black">{quoteGoose(goose.final)}</p>
                </div>
            </div>

            {/* Barcode Strip for Design */}
            <div className="mt-auto bg-gray-800 h-8 w-full rounded-b-lg flex items-center justify-center">
                <div className="w-40 h-4 bg-gray-400 rounded-sm items-center flex justify-center text-sm">
                    Undergraduate
                </div>
            </div>
        </div>
    );
}
