import { describe, expect, test, beforeEach } from '@jest/globals';
import { AppState } from './AppState';
import { doNTimes } from '../helpers/testHelper';

const actionList: string[] = [];
const creditList: Record<string, number> = {
  A: 5,
  B: 5,
  C: 5,
};

describe('the AppState Class', () => {
  test('should initialize correctly given normal data', () => {
    const appState = new AppState(creditList, actionList);
    expect(appState.creditList).toEqual(creditList);
    expect(appState.actionList).toEqual(actionList);
  });

  describe('pushing actions', () => {
    let appState: AppState | null = null;

    beforeEach(() => {
      appState = new AppState(creditList, actionList);
    });

    test('should push action to its actionList', () => {
      appState?.pushAction('A');
      expect(appState?.actionList).toContain('A');
    });

    test('should not push non existing action to its actionList', () => {
      appState?.pushAction('D');
      expect(appState?.actionList).not.toContain('D');
    });
  });

  describe('removing actions', () => {
    let appState: AppState | null = null;

    beforeEach(() => {
      appState = new AppState(creditList, actionList);
    });

    test('should remove first action with enough credits', () => {
      appState?.pushAction('A');
      appState?.removeFirstElement();
      expect(appState?.actionList).toHaveLength(0);
    });

    test("shouldn'nt remove first action with no more credits ", () => {
      doNTimes(6, 'pushAction', appState, 'A');
      doNTimes(6, 'removeFirstElement', appState, null);
      expect(appState?.actionList).toContain('A');
      expect(appState?.actionList).toHaveLength(1);
    });

    test("shouldn't remove action that does not exist", () => {
      expect(appState).not.toBeUndefined();
      if (appState) {
        appState.actionList.push('D');
        appState.removeFirstElement();
        expect(appState.actionList).toContain('D');
        expect(appState.actionList).toHaveLength(1);
      }
    });
  });
});
