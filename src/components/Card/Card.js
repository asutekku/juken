import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import theme from 'src/common/theme';
import device from 'src/utils/device';
import { TERMINOLOGY } from 'src/common/constants';

import CardCover from 'src/components/Card/CardCover';
import CardHeader from 'src/components/Card/CardHeader';
import Question from 'src/components/Card/Question';
import LongPressButton from 'src/components/Button/LongPressButton';

const DirectionLeftIcon = () => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <AntDesign name="caretleft" size={10} color={theme.color.incorrect} />
    <AntDesign name="frowno" size={18} color={theme.color.incorrect} />
  </View>
);

const DirectionRightIcon = () => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <AntDesign name="smileo" size={18} color={theme.color.correct} />
    <AntDesign name="caretright" size={10} color={theme.color.correct} />
  </View>
);

const Card = ({
  empty,
  deckProps = {},
  reviewType,
  subjectType,
  reviewQuestion,
  reviewQuestionComponent,
  reviewAnswer,
}) => {

  const {
    reveal,
    revealed,
    isFirstCard,
    getClearInterpolation,
  } = deckProps;

  // empty card
  if (empty) {
    return <View style={styles.wrapper} />;
  }

  return (
    <View style={styles.wrapper}>
      
      {/* red / green cover */}
      {isFirstCard && (
        <CardCover
          getClearInterpolation={getClearInterpolation}
        />
      )}

      {/* card contents */}
      <View style={styles.container}>

        {/* top header */}
        <CardHeader
          leftIcon={revealed ? <DirectionLeftIcon /> : null}
          rightIcon={revealed ? <DirectionRightIcon /> : null}
          centerText={revealed
            ? (device('web') ? 'Arrow Keys' : 'Swipe')
            : (TERMINOLOGY[subjectType] || '')
          }
        />

        {/* question and question statement */}
        <Question 
          revealed={revealed}
          answer={reviewAnswer}
          question={reviewQuestion}
          questionComponent={reviewQuestionComponent}
          reviewType={reviewType}
          subjectType={subjectType}
        />

        {/* reveal button */}
        <View style={{ height: 52 }}>
          {!revealed && (
            <LongPressButton
              text="Reveal"
              flashText={`Press and Hold${device('web') ? ' / Spacebar' : ''}`}
              onComplete={reveal}
            />
          )}
        </View>
      </View>
      
    </View>
  );
};

Card.propTypes = {
  empty: PropTypes.bool,
  deckProps: PropTypes.object,
  subjectType: PropTypes.string,
  reviewType: PropTypes.string,
  reviewQuestion: PropTypes.string,
  reviewQuestionComponent: PropTypes.any,
  reviewAnswer: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: device({
    base: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.bg.card,
      borderRadius: theme.radius.card,
    },
    web: {
      userSelect: 'none',
    },
  }),
  container: {
    flexGrow: 1,
    padding: theme.padding.card,
  }
  
})

export default Card;