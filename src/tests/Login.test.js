import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Login, { handleChange } from '../pages/Login';
import App from '../App'


describe('Teste Login', () => {
  it('Verifica se o campo nome está renderizado na tela', () => {
    renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByTestId('input-player-name')

    expect(inputName).toBeInTheDocument();
  })

  it('verifica se o campo email está renderizado na tela', () => {
    renderWithRouterAndRedux(<Login />)

    const inputEmail = screen.getByTestId('input-gravatar-email')

    expect(inputEmail).toBeInTheDocument();
  })

  it('verifica se o botão Play está renderizado na tela', () => {

    renderWithRouterAndRedux(<Login />)

    screen.getByRole('button', {
      name: /play/i
    })

  })

  it('verifica se o botão Play está desabilitado ao renderizar a página', () => {

    renderWithRouterAndRedux(<Login />)
    const btnPlay = screen.getByRole('button', {
      name: /play/i
    })
    expect(btnPlay.disabled).toBe(true)
  })


  it('verifica se o botão settings está renderizado na tela', () => {

    renderWithRouterAndRedux(<Login />)

    screen.getByTestId('btn-settings')
  })

  it('verifica a função handleChange', () => {

    renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btn = screen.getByRole('button', {
      name: /play/i
    })

    userEvent.type(inputName, 'abc')
    userEvent.type(inputEmail, 'abc@abc.com')

    expect(btn).toBeEnabled();
  })

  it('verifica a função handleClick', async () => {

    const { history } = renderWithRouterAndRedux(<App />)

    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btn = screen.getByRole('button', {
      name: /play/i
    })

    userEvent.type(inputName, 'abc')
    userEvent.type(inputEmail, 'abc@abc.com')

    expect(btn).toBeEnabled();

    userEvent.click(btn)
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/play');
    });
  })

  it('verifica a função clickBtn', async () => {

    const { history } = renderWithRouterAndRedux(<App />)

    const btn = screen.getByTestId('btn-settings')

    userEvent.click(btn)
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/settings');
    });
  })
})