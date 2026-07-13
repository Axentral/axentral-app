export const ACCOUNT_TYPES = ['asset', 'liability', 'equity', 'income', 'cost', 'expense'];

export const NORMAL_BALANCES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
};

export const DEFAULT_ACCOUNT = Object.freeze({
  id: '',
  code: '',
  name: '',
  type: 'asset',
  normalBalance: NORMAL_BALANCES.DEBIT,
  parentAccountId: null,
  level: 1,
  isPostingAccount: true,
  isActive: true,
  description: '',
  sortOrder: 0
});

const TYPE_NORMAL_BALANCE = Object.freeze({
  asset: NORMAL_BALANCES.DEBIT,
  cost: NORMAL_BALANCES.DEBIT,
  expense: NORMAL_BALANCES.DEBIT,
  liability: NORMAL_BALANCES.CREDIT,
  equity: NORMAL_BALANCES.CREDIT,
  income: NORMAL_BALANCES.CREDIT
});

export function createAccount(input = {}, options = {}) {
  return normalizeAccount({ ...DEFAULT_ACCOUNT, ...input }, options);
}

export function normalizeAccount(input = {}, options = {}) {
  const type = normalizeText(input.type) || DEFAULT_ACCOUNT.type;

  return {
    id: normalizeText(input.id),
    code: normalizeAccountCode(input.code),
    name: normalizeText(input.name),
    type,
    normalBalance: normalizeText(input.normalBalance) || deriveNormalBalance(type),
    parentAccountId: normalizeOptionalText(input.parentAccountId),
    level: deriveLevel(options.parentAccount, input.level),
    isPostingAccount: normalizeBoolean(input.isPostingAccount, DEFAULT_ACCOUNT.isPostingAccount),
    isActive: normalizeBoolean(input.isActive, DEFAULT_ACCOUNT.isActive),
    description: normalizeText(input.description),
    sortOrder: normalizeNumber(input.sortOrder, DEFAULT_ACCOUNT.sortOrder)
  };
}

export function deriveNormalBalance(type) {
  return TYPE_NORMAL_BALANCE[normalizeText(type)] || DEFAULT_ACCOUNT.normalBalance;
}

export function deriveLevel(parentAccount, fallbackLevel = DEFAULT_ACCOUNT.level) {
  if (parentAccount && Number.isFinite(Number(parentAccount.level))) {
    return Number(parentAccount.level) + 1;
  }

  const level = Number(fallbackLevel);
  return Number.isFinite(level) && level > 0 ? level : DEFAULT_ACCOUNT.level;
}

export function cloneAccount(account) {
  return { ...normalizeAccount(account) };
}

function normalizeAccountCode(value) {
  return String(value ?? '').trim();
}

function normalizeOptionalText(value) {
  const normalized = normalizeText(value);
  return normalized || null;
}

function normalizeText(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

function normalizeBoolean(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}
