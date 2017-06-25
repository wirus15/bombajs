import 'core-js/es6';
import 'core-js/es7/reflect';
import 'reflect-metadata';

if (process.env.ENV !== 'production') {
    Error['stackTraceLimit'] = Infinity;
}
