import resolveConfig from 'tailwindcss/resolveConfig';
import { Config } from 'tailwindcss/types/config';
import tailwindConfig from '../../tailwind.config';

const tailwindFullConfig = resolveConfig(tailwindConfig as unknown as Config);

export default tailwindFullConfig;
