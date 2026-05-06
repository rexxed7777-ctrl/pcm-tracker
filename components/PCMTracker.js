"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";

// Subjects split into Class 11 & Class 12
const subjects = {
  Physics: {
    class11: ["Units & Dimensions","Errors & Measurements","Vectors","Kinematics","NLM","Friction","Circular Motion","Work, Energy, Power","COM & Collision","Rotation","Gravitation","Properties of Matter","Thermodynamics","Kinetic Theory","SHM","Waves"],
    class12: ["Electrostatics","Capacitance","Current Electricity","Magnetism","EMI","AC","Ray Optics","Wave Optics","Modern Physics","Semiconductor"]
  },
  Chemistry: {
    class11: ["Mole Concept","Atomic Structure","Periodic Table","Chemical Bonding","States of Matter","Thermodynamics","Equilibrium","Redox"],
    class12: ["Electrochemistry","Chemical Kinetics","GOC","Isomerism","Hydrocarbons","Haloalkanes","Alcohol Phenol Ether","Aldehyde Ketone","Carboxylic Acid","Amines","Coordination Compounds","p-block","d-block"]
  },
  Mathematics: {
    class11: ["Basic Algebra revision","Quadratic Equations","Sequences & Series","Binomial Theorem","Complex Numbers","Permutation & Combination","Probability","Straight Lines","Circles","Parabola","Ellipse","Hyperbola","Functions","Limits","Continuity","Differentiation"],
    class12: ["Application of Derivatives","Integration","Differential Equations","Matrices","Determinants","Vectors","3D Geometry","Trigonometry"]
  }
};

// Short reminders (you can expand if needed)
const reminders = {
  "Units & Dimensions": "Memorize SI units and dimensional formulas.",
  "Kinematics": "Revise equations of motion and graphs.",
  "NLM": "Newton’s laws applications are key.",
  "Electrostatics": "Practice derivations and diagrams.",
  "Integration": "Revise standard formulas and practice PYQs.",
  "Probability": "Revise conditional probability and Bayes theorem."
};

export default function PCMTracker() {
  const [completed, setCompleted] = useState({});
  const [confidence, setConfidence] = useState({});
  const [notes, setNotes] = useState({});
  const [activeSubject, setActiveSubject] = useState(null);

  const toggleTask = (task) => {
    setCompleted((prev) => ({ ...prev, [task]: !prev[task] }));
  };

  const calculateProgress = (tasks) => {
    const done = tasks.filter((task) => completed[task]).length;
    return Math.round((done / tasks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">PCM Foundation Tracker</h1>
        <span className="text-sm text-gray-500">Class 11 & 12</span>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {!activeSubject ? (
            // Overview Screen
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {Object.entries(subjects).map(([subject, { class11, class12 }]) => {
                const allTasks = [...class11, ...class12];
                const progress = calculateProgress(allTasks);
                return (
                  <Card
                    key={subject}
                    onClick={() => setActiveSubject(subject)}
                    className="cursor-pointer rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  >
                    <CardContent className="p-6 text-center">
                      <h2 className="text-2xl font-bold mb-4">{subject}</h2>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      >
                        <Progress value={progress} className="mb-2 bg-white/30" />
                      </motion.div>
                      <p>{progress}% completed</p>
                      <p className="mt-2 text-sm opacity-80">Click to view chapters</p>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>
          ) : (
            // Detail Screen
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setActiveSubject(null)}
                className="mb-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:scale-105 transition"
              >
                ← Back
              </button>
              <h2 className="text-3xl font-bold mb-6 text-indigo-700">{activeSubject}</h2>

              {["class11", "class12"].map((cls) => (
                <div key={cls} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                    {cls === "class11" ? "Class 11 Chapters" : "Class 12 Chapters"}
                  </h3>
                  <div className="space-y-4">
                    {subjects[activeSubject][cls].map((task) => (
                      <motion.div
                        key={task}
                        className={`p-4 rounded-xl shadow-md ${cls === "class11" ? "bg-blue-50" : "bg-green-50"} hover:shadow-lg transition`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Checkbox
                              checked={!!completed[task]}
                              onCheckedChange={() => toggleTask(task)}
                            />
                          </motion.div>
                          <span className={completed[task] ? "line-through text-gray-400" : "font-medium"}>
                            {task}
                          </span>
                        </div>

                        {/* Confidence slider */}
                        <div className="ml-6 flex items-center gap-2 mt-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={confidence[task] || 0}
                            onChange={(e) =>
                              setConfidence((prev) => ({ ...prev, [task]: e.target.value }))
                            }
                            className="w-full accent-indigo-500"
                          />
                          <span className="text-sm text-gray-600">
                            {confidence[task] || 0}% confident
                          </span>
                        </div>

                        {/* Notes */}
                        <textarea
                          placeholder="Add a note..."
                          value={notes[task] || ""}
                          onChange={(e) =>
                            setNotes((prev) => ({ ...prev, [task]: e.target.value }))
                          }
                          className="ml-6 mt-3 p-3 border rounded-lg w-full text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        />

                        {/* Reminder */}
                        {reminders[task] && (
                          <p className="ml-6 mt-2 text-xs text-indigo-600 italic">
                            Reminder: {reminders[task]}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm mt-8">
        “Consistency beats motivation — study a little every day.”
      </footer>
    </div>
  );
}
