import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* import { act } from 'react-dom/test-utils'; */
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback, { rankingBtn, handleClick } from '../pages/Feedback';
/* import App from '../App'; */

describe('Teste página Feedback', () => {
 it('A pagina carrega as informações da tela de feeback', () => {
    renderWithRouterAndRedux(<Feedback />)
    screen.getByRole('img', {
        name: /avatar de usuario/i})
      screen.getByTestId('header-player-name')
      screen.getByTestId('feedback-text')
      screen.getByTestId('feedback-total-question')})
      screen.findAllByRole('button', {
        name: /play again/i})
      screen.findAllByRole('button', {
          name: /ranking/i
        })

        it('Verifica a função playAgain', () => {    
          
          renderWithRouterAndRedux(<Feedback />)
          const playAgainBTN = screen.getByTestId('btn-play-again')
          userEvent.click(playAgainBTN)
          expect(rankingBtn).toHaveBeenCalled();
        })
        it('Verifica a função playAgain', () => {
          renderWithRouterAndRedux(<Feedback />)
          const playAgainBTN = screen.getByTestId('btn-play-again')
          userEvent.click(playAgainBTN)
          expect(handleClick).toHaveBeenCalled();
        })
        it('Verifica a função playAgain', () => {
          renderWithRouterAndRedux(<Feedback />)
          const BTNRanking = screen.getByTestId('btn-ranking')
          userEvent.click(BTNRanking)
          expect(rankingBtn).toHaveBeenCalled();
        })
    });
