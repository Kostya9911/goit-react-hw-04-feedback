import React, { Component } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  addFeedback = option => {
    this.setState({ [option]: this.state[option] + 1 });
  };

  countTotalFeedback = (good, bad, neutral) => {
    return good + bad + neutral;
  };
  countPositiveFeedbackPercentage = (good, total) => {
    let Percentage;
    total === 0
      ? (Percentage = 0)
      : (Percentage = Math.round((good / total) * 100));
    return Percentage;
  };

  render() {
    const { good, bad, neutral } = this.state;

    let total = this.countTotalFeedback(good, bad, neutral);
    let positivePercentage = this.countPositiveFeedbackPercentage(good, total);

    return (
      <div>
        <Section title="Please Leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.addFeedback}
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
  }
}
