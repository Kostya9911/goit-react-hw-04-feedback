import { useState } from 'react';

import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedback = option => {
    if (option === 'good') {
      setGood(good + 1);
      return;
    }
    if (option === 'bad') {
      setBad(bad + 1);
      return;
    }
    setNeutral(neutral + 1);
  };

  const countTotalFeedback = (good, bad, neutral) => {
    return good + bad + neutral;
  };
  const countPositiveFeedbackPercentage = (good, total) => {
    let Percentage;
    total === 0
      ? (Percentage = 0)
      : (Percentage = Math.round((good / total) * 100));
    return Percentage;
  };

  let options = { good, neutral, bad };
  let total = countTotalFeedback(good, bad, neutral);
  let positivePercentage = countPositiveFeedbackPercentage(good, total);

  return (
    <div>
      <Section title="Please Leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={addFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics"></Section>
      {total > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        ></Statistics>
      ) : (
        <Notification message={'There is no feedback'}></Notification>
      )}
    </div>
  );
};
