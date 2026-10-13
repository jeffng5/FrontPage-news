import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Preferences from './Preferences';

jest.mock('jwt-decode', () => ({ jwtDecode: jest.fn(() => ({})) }));

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('username', 'tester');
  localStorage.setItem('token', 'mock-token');
});

function renderPreferences() {
  return render(<MemoryRouter><Preferences /></MemoryRouter>);
}

test('saves checked topics and restores them when reopened', () => {
  const view = renderPreferences();
  fireEvent.click(screen.getByRole('checkbox', { name: 'Sports' }));
  fireEvent.click(screen.getByRole('checkbox', { name: 'U.S.' }));
  fireEvent.click(screen.getByRole('button', { name: 'Save Preferences' }));
  expect(localStorage.getItem('preferences')).toBe('Sports,US');
  view.unmount();
  renderPreferences();
  expect(screen.getByRole('checkbox', { name: 'Sports' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'U.S.' })).toBeChecked();
});

test('saving only a search edit preserves saved topics', () => {
  localStorage.setItem('preferences', 'Sports,Science');
  renderPreferences();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'tennis' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Preferences' }));
  expect(localStorage.getItem('preferences')).toBe('Sports,Science');
  expect(localStorage.getItem('freePreferences')).toBe('tennis');
});

test('saves all five selected topics and restores every checkbox', () => {
  const topics = ['Business', 'Entertainment', 'Food', 'Health', 'Science'];
  const view = renderPreferences();
  topics.forEach(name => fireEvent.click(screen.getByRole('checkbox', { name })));
  fireEvent.click(screen.getByRole('button', { name: 'Save Preferences' }));
  expect(localStorage.getItem('preferences')).toBe(topics.join(','));
  view.unmount();
  renderPreferences();
  topics.forEach(name => expect(screen.getByRole('checkbox', { name })).toBeChecked());
});

test('unchecking a saved topic removes it on save', () => {
  localStorage.setItem('preferences', 'Sports,Science');
  renderPreferences();
  fireEvent.click(screen.getByRole('checkbox', { name: 'Sports' }));
  fireEvent.click(screen.getByRole('button', { name: 'Save Preferences' }));
  expect(localStorage.getItem('preferences')).toBe('Science');
});

test('rejects a sixth topic without clearing saved preferences', () => {
  localStorage.setItem('preferences', 'Sports,Science,US,Asia,Food');
  renderPreferences();
  fireEvent.click(screen.getByRole('checkbox', { name: 'Business' }));
  expect(screen.getByRole('checkbox', { name: 'Business' })).not.toBeChecked();
  expect(screen.getByText('Please select at most 5 topics')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Save Preferences' }));
  expect(localStorage.getItem('preferences')).toBe('Sports,Science,US,Asia,Food');
});
