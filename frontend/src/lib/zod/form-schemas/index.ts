import { datetime } from "./fields/datetime";
import { email } from "./fields/email";
import { number } from "./fields/number";
import { password } from "./fields/password";
import { string } from "./fields/string";

export const formSchema = {
  string,
  number,
  email,
  password,
  datetime,
};
