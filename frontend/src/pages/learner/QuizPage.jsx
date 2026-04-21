import ButtonLink from '@/components/common/ButtonLink';
import PageShell from '@/components/common/PageShell';
import { quizzes } from '@/data/quizzes';
import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export default function QuizPage() {
  const { courseId, quizId } = useParams();

  const quiz = useMemo(() => {
    return quizzes.find(
      (item) => item.id === quizId && item.courseId === courseId
    );
  }, [courseId, quizId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return <Navigate to="/learner/dashboard" replace />;
  }

  const currentQuestion = quiz.questions[currentIndex];

  const handleSelect = (index) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
  };

  const calculateScore = () => {
    let correct = 0;

    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswerIndex) {
        correct += 1;
      }
    });

    return Math.round((correct / quiz.questions.length) * 100);
  };

  const score = calculateScore();
  const hasPassed = score >= quiz.passPercentage;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const hasSelectedCurrentAnswer =
    selectedAnswers[currentQuestion.id] !== undefined;

  return (
    <section>
      <PageShell
        title={quiz.title}
        description="Answer all questions and submit to see your score."
        action={
          <ButtonLink to="/learner/dashboard" variant="outline">
            Back to Dashboard
          </ButtonLink>
        }
      />

      {!submitted ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 text-sm text-slate-500">
            Question {currentIndex + 1} of {quiz.questions.length}
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            {currentQuestion.question}
          </h2>

          <div className="mt-5 grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(index)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            {!isLastQuestion ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSelectedCurrentAnswer}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!hasSelectedCurrentAnswer}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-10">
          <h2
            className={`text-3xl font-semibold ${
              hasPassed ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Your Score: {score}%
          </h2>

          <p className="mt-3 text-slate-600">
            {hasPassed
              ? 'Congratulations! You passed the quiz.'
              : 'You did not meet the passing criteria. Try again.'}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <ButtonLink to="/learner/dashboard">Go to Dashboard</ButtonLink>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      )}
    </section>
  );
}