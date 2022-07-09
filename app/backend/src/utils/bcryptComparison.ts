import * as bcryptjs from 'bcryptjs';

const comparison = (passwordToCompare : string, encrypted : string): Promise<boolean> =>
  bcryptjs.compare(passwordToCompare, encrypted);

export default comparison;
