import {Account} from "../models/Account";

export const accountsPromise = new Account().findAll();