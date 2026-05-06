"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Flame, Target, Calendar, Moon, Sun, RotateCcw, BookOpen, Sparkles, Brain, Rocket } from "lucide-react";

const subjects = {
  Physics: {
    priority: "Highest",
    chapters: [
      "Units & Dimensions","Errors & Measurements","Vectors","Kinematics","Newton Laws of Motion","Friction","Circular Motion","Work Energy Power","COM & Collision","Rotation","Gravitation","Properties of Matter","Thermodynamics","Kinetic Theory","SHM","Waves","Electrostatics","Capacitance","Current Electricity","Magnetism","EMI","AC","Ray Optics","Wave Optics","Modern Physics","Semiconductor"
    ]
  },
  Chemistry: {
    priority: "Medium",
    chapters: [
      "Mole Concept","Atomic Structure","Periodic Table","Chemical Bonding","States of Matter","Thermodynamics","Equilibrium","Redox","Electrochemistry","Chemical Kinetics","GOC","Isomerism","Hydrocarbons","Haloalkanes","Alcohol Phenol Ether","Aldehyde Ketone","Carboxylic Acid","Amines","Coordination Compounds","p-block","d-block","Salt Analysis Basics"
    ]
  },
  Mathematics: {
    priority: "High",
    chapters: [
      "Basic Algebra Revision","Quadratic Equations","Sequence & Series","Binomial Theorem","Complex Numbers","Permutation & Combination","Probability","Straight Lines","Circles","Parabola","Ellipse","Hyperbola","Functions","Limits","Continuity","Differentiation","Application of Derivatives","Integration","Differential Equations","Matrices","Determinants","Vectors","3D Geometry"
    ]
  }
};

const chapterTips = new Proxy({
  "Units & Dimensions": "Remember dimensional formula tricks and SI units.",
  "Kinematics": "Revise motion graphs and equations of motion.",
  "Newton Laws of Motion": "Focus on free body diagrams and force balance.",
  "Thermodynamics": "Laws, sign conventions, heat-work relation.",
  "Electrostatics": "Gauss law, electric field, potential relations.",
  "Mole Concept": "Conversions, limiting reagent, stoichiometry.",
  "Chemical Bonding": "Hybridization, VSEPR, MOT basics.",
  "GOC": "Inductive effect, resonance, acidity/basicity.",
  "Quadratic Equations": "Roots relation, discriminant patterns.",
  "Integration": "Standard formulas + substitutions."
}, {
  get: (target, prop) => target[prop] || `Revise formulas, concepts, common mistakes, and PYQ patterns for ${prop}.`
});

const getResourceLink = (chapter) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(chapter + " JEE one shot")}`;

export default function PCMTracker() {
  const [completed, setCompleted] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("completed");
    const savedDark = localStorage.getItem("darkMode");
    const savedStreak = localStorage.getItem("streak");

    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    if (savedDark) setDarkMode(JSON.parse(savedDark));
    if (savedStreak) setStreak(JSON.parse(savedStreak));

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("completed", JSON.stringify(completed));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [completed, darkMode, streak, loaded]);

  const toggleTask = (task) => {
    setCompleted((prev) => ({ ...prev, [task]: !prev[task] }));
  };

  const calculateProgress = (chapters) => {
    const done = chapters.filter((c) => completed[c]).length;
    return Math.round((done / chapters.length) * 100);
  };

  const resetProgress = () => {
    setCompleted({});
    setStreak(0);
  };

  return (
    <div className={darkMode ? "dark bg-black text-white min-h-screen font-['Sora']" : "bg-white text-black min-h-screen font-['Sora']"}>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-neutral-200 dark:border-neutral-800 shadow-xl p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">PCM Foundation Roadmap</h1>
        <div className="flex gap-3 items-center">
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="destructive" onClick={resetProgress}>
            <RotateCcw size={16} className="mr-2" /> Reset
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white/80 dark:bg-neutral-950">
            <CardContent className="p-5 flex gap-3 items-center">
              <Flame className="text-orange-400" />
              <div>
                <p className="text-sm text-neutral-500">Streak</p>
                <h2 className="text-xl font-semibold">{streak} days</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white/80 dark:bg-neutral-950">
            <CardContent className="p-5 flex gap-3 items-center">
              <Brain className="text-cyan-400" />
              <div>
                <p className="text-sm text-neutral-500">Daily Goal</p>
                <h2 className="text-xl font-semibold">7 hrs</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white/80 dark:bg-neutral-950">
            <CardContent className="p-5 flex gap-3 items-center">
              <Rocket className="text-violet-400" />
              <div>
                <p className="text-sm text-neutral-500">Countdown</p>
                <h2 className="text-xl font-semibold">60 Days</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white/80 dark:bg-neutral-950">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3">How To Study Any Chapter</h2>
            <ol className="space-y-2 list-decimal ml-6">
              <li>Understand theory: concept, why it happens, formula meaning.</li>
              <li>Write chapter sheet: formulas, definitions, exceptions, mistakes.</li>
              <li>Do 5 solved examples minimum.</li>
              <li>Solve 15–20 easy questions.</li>
              <li>Solve 10–15 moderate questions.</li>
              <li>Maintain error notebook.</li>
              <li>Revision after 1 day, 3 days, 7 days.</li>
            </ol>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(subjects).map(([subject, data]) => {
            const progress = calculateProgress(data.chapters);
            return (
              <motion.div whileHover={{ scale: 1.02 }} key={subject}>
                <Card className="rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white/80 dark:bg-neutral-950">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold">{subject}</h2>
                    <p className="text-sm mb-3">Priority: {data.priority}</p>
                    <Progress value={progress} className="mb-4" />
                    <p>{progress}% completed</p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3 mt-4"
                    >
                      {data.chapters.map((chapter) => (
                        <motion.div
                          key={chapter}
                          whileHover={{ scale: 1.03 }}
                          className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 relative border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                        >
                          <div className="flex items-center gap-2">
                          <Checkbox checked={!!completed[chapter]} onCheckedChange={() => toggleTask(chapter)} />
                          <span className={completed[chapter] ? "line-through text-gray-400" : ""}>{chapter}</span>
                          <a href={getResourceLink(chapter)} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-black dark:hover:text-white underline ml-auto flex items-center gap-1 transition">
                            <BookOpen size={12} /> Resource
                          </a>
                          </div>
                          <div className="ml-6">
                            <details className="group cursor-pointer">
                              <summary className="text-xs text-neutral-500 hover:text-black dark:hover:text-white select-none transition">
                                View revision tip
                              </summary>
                              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 italic bg-neutral-100 dark:bg-neutral-900 p-3 rounded-xl max-w-md border border-neutral-200 dark:border-neutral-800">
                                Remember: {chapterTips[chapter]}
                              </p>
                            </details>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-3">Daily Schedule</h2>
            <ul className="space-y-2">
              <li>Morning: Physics – 3 hrs</li>
              <li>Afternoon: Maths – 2 hrs</li>
              <li>Evening: Chemistry – 2 hrs</li>
              <li>Night: Revision – 30 mins</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
