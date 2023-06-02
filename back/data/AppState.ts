import { constants } from '../config/constants';

export class AppState {
  actionList: string[] = [];
  creditList: Record<string, number>;

  constructor(creditList: Record<string, number>, actionList?: string[]) {
    this.actionList = actionList || [];
    this.creditList = creditList;
  }

  public setCreditList(creditList: Record<string, number>) {
    this.creditList = creditList;
  }

  private setActionList(actionList: string[]) {
    this.actionList = actionList;
  }

  /**
   * Remove first element if there is any element in the actionList and if the corresponding credit is more than 0.
   * Decrement corresponding credit
   */
  public removeFirstElement(): void {
    const { actionList, creditList } = this;

    // get first element
    const [firstElement, ...rest] = actionList;

    // Check if action exists
    const { ACTIONS } = constants;
    const actionNames = ACTIONS.map((action) => action.name);
    if (!actionNames.includes(firstElement)) {
      return;
    }

    // no element in actionList or no credit for first element
    if (!actionList.length || creditList[firstElement] < 1) {
      return;
    }

    // Everything checked
    // 1. Decrement credit for first element
    // 2. Remove first element

    const newCreditList = {
      ...creditList,
      [firstElement]: creditList[firstElement] - 1,
    };

    this.setCreditList(newCreditList);
    this.setActionList(rest);
  }

  public pushAction(action: string): void {
    // Check if action exists
    const { ACTIONS } = constants;
    const actionNames = ACTIONS.map((action) => action.name);
    if (!actionNames.includes(action)) {
      return;
    }

    // If action exists, push it to actionList
    const { actionList } = this;
    const newActionList = [...actionList, action];

    this.setActionList(newActionList);
    return;
  }
}
