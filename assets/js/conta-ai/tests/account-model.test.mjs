import assert from 'node:assert/strict';
import {
  ACCOUNT_TYPES,
  DEFAULT_ACCOUNT,
  NORMAL_BALANCES,
  cloneAccount,
  createAccount,
  deriveLevel,
  deriveNormalBalance,
  normalizeAccount
} from '../models/account.model.js';

const account = createAccount({
  id: ' acc-1 ',
  code: ' 1. 01-A ',
  name: '  Banco   Principal ',
  type: 'asset',
  description: '  Cuenta   bancaria ',
  sortOrder: '2'
});

assert.equal(account.id, 'acc-1', 'normaliza id');
assert.equal(account.code, '1.01-A', 'normaliza código y elimina espacios');
assert.equal(account.name, 'Banco Principal', 'normaliza nombre');
assert.equal(account.type, 'asset', 'crea cuenta válida');
assert.equal(account.normalBalance, NORMAL_BALANCES.DEBIT, 'deriva naturaleza débito para activo');
assert.equal(account.level, 1, 'usa nivel por defecto');
assert.equal(account.isPostingAccount, true, 'valor por defecto imputable');
assert.equal(account.isActive, true, 'valor por defecto activo');
assert.equal(account.description, 'Cuenta bancaria', 'normaliza descripción opcional');
assert.equal(account.sortOrder, 2, 'normaliza orden visual');

const defaultAccount = createAccount();
assert.deepEqual(defaultAccount, DEFAULT_ACCOUNT, 'valores por defecto seguros');

assert.equal(deriveNormalBalance('liability'), NORMAL_BALANCES.CREDIT, 'pasivo deriva crédito');
assert.equal(deriveNormalBalance('equity'), NORMAL_BALANCES.CREDIT, 'patrimonio deriva crédito');
assert.equal(deriveNormalBalance('income'), NORMAL_BALANCES.CREDIT, 'ingreso deriva crédito');
assert.equal(deriveNormalBalance('cost'), NORMAL_BALANCES.DEBIT, 'costo deriva débito');
assert.equal(deriveNormalBalance('expense'), NORMAL_BALANCES.DEBIT, 'gasto deriva débito');
assert.equal(deriveNormalBalance('unknown'), DEFAULT_ACCOUNT.normalBalance, 'tipo desconocido usa naturaleza segura por defecto');

assert.equal(deriveLevel({ level: 2 }), 3, 'deriva nivel desde cuenta padre');
assert.equal(deriveLevel(null, 4), 4, 'usa fallback si no hay padre');
assert.equal(deriveLevel(null, 'no-number'), 1, 'usa nivel seguro si fallback no es numérico');

const child = createAccount({ parentAccountId: 'parent', level: 1 }, { parentAccount: { level: 3 } });
assert.equal(child.parentAccountId, 'parent', 'conserva cuenta padre');
assert.equal(child.level, 4, 'calcula nivel desde cuenta padre disponible');

const explicitBalance = createAccount({ type: 'asset', normalBalance: 'credit' });
assert.equal(explicitBalance.normalBalance, 'credit', 'permite naturaleza explícita para futuras extensiones');

const minimal = normalizeAccount({ code: 'G-001', name: 'Gastos', type: 'expense' });
assert.equal(minimal.code, 'G-001', 'acepta datos mínimos');
assert.equal(minimal.normalBalance, NORMAL_BALANCES.DEBIT, 'deriva naturaleza con datos mínimos');

const optional = createAccount({ parentAccountId: '', isPostingAccount: false, isActive: false, description: '' });
assert.equal(optional.parentAccountId, null, 'normaliza padre vacío como null');
assert.equal(optional.isPostingAccount, false, 'permite cuenta agrupadora');
assert.equal(optional.isActive, false, 'permite estado inactivo');

assert.deepEqual(ACCOUNT_TYPES, ['asset', 'liability', 'equity', 'income', 'cost', 'expense'], 'tipos válidos del MVP');

const cloned = cloneAccount(account);
assert.deepEqual(cloned, account, 'clona cuenta normalizada');
assert.notEqual(cloned, account, 'la clonación devuelve una nueva referencia');

const sanitized = createAccount({ code: ' A 1 / * ? ' });
assert.equal(sanitized.code, 'A1', 'el código solo conserva caracteres permitidos');

console.log('Pruebas del modelo de Cuenta completadas.');
