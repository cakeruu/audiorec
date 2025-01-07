var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import require$$1$1, { app, BrowserWindow, ipcMain, dialog, desktopCapturer } from "electron";
import { fileURLToPath } from "node:url";
import require$$1 from "os";
import require$$0 from "fs";
import path from "node:path";
import require$$0$1 from "path";
import require$$0$2 from "util";
import require$$3$2 from "crypto";
import require$$4 from "assert";
import require$$0$3 from "events";
import require$$0$4, { spawn } from "child_process";
import require$$0$5 from "http";
import require$$1$2 from "https";
import { createRequire } from "module";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var source$1 = { exports: {} };
var isObj;
var hasRequiredIsObj;
function requireIsObj() {
  if (hasRequiredIsObj) return isObj;
  hasRequiredIsObj = 1;
  isObj = (value) => {
    const type2 = typeof value;
    return value !== null && (type2 === "object" || type2 === "function");
  };
  return isObj;
}
var dotProp;
var hasRequiredDotProp;
function requireDotProp() {
  if (hasRequiredDotProp) return dotProp;
  hasRequiredDotProp = 1;
  const isObj2 = requireIsObj();
  const disallowedKeys = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]);
  const isValidPath = (pathSegments) => !pathSegments.some((segment) => disallowedKeys.has(segment));
  function getPathSegments(path2) {
    const pathArray = path2.split(".");
    const parts = [];
    for (let i = 0; i < pathArray.length; i++) {
      let p = pathArray[i];
      while (p[p.length - 1] === "\\" && pathArray[i + 1] !== void 0) {
        p = p.slice(0, -1) + ".";
        p += pathArray[++i];
      }
      parts.push(p);
    }
    if (!isValidPath(parts)) {
      return [];
    }
    return parts;
  }
  dotProp = {
    get(object2, path2, value) {
      if (!isObj2(object2) || typeof path2 !== "string") {
        return value === void 0 ? object2 : value;
      }
      const pathArray = getPathSegments(path2);
      if (pathArray.length === 0) {
        return;
      }
      for (let i = 0; i < pathArray.length; i++) {
        object2 = object2[pathArray[i]];
        if (object2 === void 0 || object2 === null) {
          if (i !== pathArray.length - 1) {
            return value;
          }
          break;
        }
      }
      return object2 === void 0 ? value : object2;
    },
    set(object2, path2, value) {
      if (!isObj2(object2) || typeof path2 !== "string") {
        return object2;
      }
      const root = object2;
      const pathArray = getPathSegments(path2);
      for (let i = 0; i < pathArray.length; i++) {
        const p = pathArray[i];
        if (!isObj2(object2[p])) {
          object2[p] = {};
        }
        if (i === pathArray.length - 1) {
          object2[p] = value;
        }
        object2 = object2[p];
      }
      return root;
    },
    delete(object2, path2) {
      if (!isObj2(object2) || typeof path2 !== "string") {
        return false;
      }
      const pathArray = getPathSegments(path2);
      for (let i = 0; i < pathArray.length; i++) {
        const p = pathArray[i];
        if (i === pathArray.length - 1) {
          delete object2[p];
          return true;
        }
        object2 = object2[p];
        if (!isObj2(object2)) {
          return false;
        }
      }
    },
    has(object2, path2) {
      if (!isObj2(object2) || typeof path2 !== "string") {
        return false;
      }
      const pathArray = getPathSegments(path2);
      if (pathArray.length === 0) {
        return false;
      }
      for (let i = 0; i < pathArray.length; i++) {
        if (isObj2(object2)) {
          if (!(pathArray[i] in object2)) {
            return false;
          }
          object2 = object2[pathArray[i]];
        } else {
          return false;
        }
      }
      return true;
    }
  };
  return dotProp;
}
var pkgUp = { exports: {} };
var findUp = { exports: {} };
var locatePath = { exports: {} };
var pathExists = { exports: {} };
var hasRequiredPathExists;
function requirePathExists() {
  if (hasRequiredPathExists) return pathExists.exports;
  hasRequiredPathExists = 1;
  const fs2 = require$$0;
  pathExists.exports = (fp) => new Promise((resolve2) => {
    fs2.access(fp, (err) => {
      resolve2(!err);
    });
  });
  pathExists.exports.sync = (fp) => {
    try {
      fs2.accessSync(fp);
      return true;
    } catch (err) {
      return false;
    }
  };
  return pathExists.exports;
}
var pLimit = { exports: {} };
var pTry = { exports: {} };
var hasRequiredPTry;
function requirePTry() {
  if (hasRequiredPTry) return pTry.exports;
  hasRequiredPTry = 1;
  const pTry$1 = (fn, ...arguments_) => new Promise((resolve2) => {
    resolve2(fn(...arguments_));
  });
  pTry.exports = pTry$1;
  pTry.exports.default = pTry$1;
  return pTry.exports;
}
var hasRequiredPLimit;
function requirePLimit() {
  if (hasRequiredPLimit) return pLimit.exports;
  hasRequiredPLimit = 1;
  const pTry2 = requirePTry();
  const pLimit$1 = (concurrency) => {
    if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    }
    const queue = [];
    let activeCount = 0;
    const next = () => {
      activeCount--;
      if (queue.length > 0) {
        queue.shift()();
      }
    };
    const run = (fn, resolve2, ...args) => {
      activeCount++;
      const result = pTry2(fn, ...args);
      resolve2(result);
      result.then(next, next);
    };
    const enqueue = (fn, resolve2, ...args) => {
      if (activeCount < concurrency) {
        run(fn, resolve2, ...args);
      } else {
        queue.push(run.bind(null, fn, resolve2, ...args));
      }
    };
    const generator = (fn, ...args) => new Promise((resolve2) => enqueue(fn, resolve2, ...args));
    Object.defineProperties(generator, {
      activeCount: {
        get: () => activeCount
      },
      pendingCount: {
        get: () => queue.length
      },
      clearQueue: {
        value: () => {
          queue.length = 0;
        }
      }
    });
    return generator;
  };
  pLimit.exports = pLimit$1;
  pLimit.exports.default = pLimit$1;
  return pLimit.exports;
}
var pLocate;
var hasRequiredPLocate;
function requirePLocate() {
  if (hasRequiredPLocate) return pLocate;
  hasRequiredPLocate = 1;
  const pLimit2 = requirePLimit();
  class EndError extends Error {
    constructor(value) {
      super();
      this.value = value;
    }
  }
  const testElement = (el, tester) => Promise.resolve(el).then(tester);
  const finder = (el) => Promise.all(el).then((val) => val[1] === true && Promise.reject(new EndError(val[0])));
  pLocate = (iterable, tester, opts) => {
    opts = Object.assign({
      concurrency: Infinity,
      preserveOrder: true
    }, opts);
    const limit2 = pLimit2(opts.concurrency);
    const items2 = [...iterable].map((el) => [el, limit2(testElement, el, tester)]);
    const checkLimit = pLimit2(opts.preserveOrder ? 1 : Infinity);
    return Promise.all(items2.map((el) => checkLimit(finder, el))).then(() => {
    }).catch((err) => err instanceof EndError ? err.value : Promise.reject(err));
  };
  return pLocate;
}
var hasRequiredLocatePath;
function requireLocatePath() {
  if (hasRequiredLocatePath) return locatePath.exports;
  hasRequiredLocatePath = 1;
  const path2 = require$$0$1;
  const pathExists2 = requirePathExists();
  const pLocate2 = requirePLocate();
  locatePath.exports = (iterable, options) => {
    options = Object.assign({
      cwd: process.cwd()
    }, options);
    return pLocate2(iterable, (el) => pathExists2(path2.resolve(options.cwd, el)), options);
  };
  locatePath.exports.sync = (iterable, options) => {
    options = Object.assign({
      cwd: process.cwd()
    }, options);
    for (const el of iterable) {
      if (pathExists2.sync(path2.resolve(options.cwd, el))) {
        return el;
      }
    }
  };
  return locatePath.exports;
}
var hasRequiredFindUp;
function requireFindUp() {
  if (hasRequiredFindUp) return findUp.exports;
  hasRequiredFindUp = 1;
  const path2 = require$$0$1;
  const locatePath2 = requireLocatePath();
  findUp.exports = (filename, opts = {}) => {
    const startDir = path2.resolve(opts.cwd || "");
    const { root } = path2.parse(startDir);
    const filenames = [].concat(filename);
    return new Promise((resolve2) => {
      (function find(dir) {
        locatePath2(filenames, { cwd: dir }).then((file2) => {
          if (file2) {
            resolve2(path2.join(dir, file2));
          } else if (dir === root) {
            resolve2(null);
          } else {
            find(path2.dirname(dir));
          }
        });
      })(startDir);
    });
  };
  findUp.exports.sync = (filename, opts = {}) => {
    let dir = path2.resolve(opts.cwd || "");
    const { root } = path2.parse(dir);
    const filenames = [].concat(filename);
    while (true) {
      const file2 = locatePath2.sync(filenames, { cwd: dir });
      if (file2) {
        return path2.join(dir, file2);
      }
      if (dir === root) {
        return null;
      }
      dir = path2.dirname(dir);
    }
  };
  return findUp.exports;
}
var hasRequiredPkgUp;
function requirePkgUp() {
  if (hasRequiredPkgUp) return pkgUp.exports;
  hasRequiredPkgUp = 1;
  const findUp2 = requireFindUp();
  pkgUp.exports = async ({ cwd } = {}) => findUp2("package.json", { cwd });
  pkgUp.exports.sync = ({ cwd } = {}) => findUp2.sync("package.json", { cwd });
  return pkgUp.exports;
}
var envPaths = { exports: {} };
var hasRequiredEnvPaths;
function requireEnvPaths() {
  if (hasRequiredEnvPaths) return envPaths.exports;
  hasRequiredEnvPaths = 1;
  const path2 = require$$0$1;
  const os = require$$1;
  const homedir = os.homedir();
  const tmpdir = os.tmpdir();
  const { env } = process;
  const macos = (name) => {
    const library = path2.join(homedir, "Library");
    return {
      data: path2.join(library, "Application Support", name),
      config: path2.join(library, "Preferences", name),
      cache: path2.join(library, "Caches", name),
      log: path2.join(library, "Logs", name),
      temp: path2.join(tmpdir, name)
    };
  };
  const windows = (name) => {
    const appData = env.APPDATA || path2.join(homedir, "AppData", "Roaming");
    const localAppData = env.LOCALAPPDATA || path2.join(homedir, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: path2.join(localAppData, name, "Data"),
      config: path2.join(appData, name, "Config"),
      cache: path2.join(localAppData, name, "Cache"),
      log: path2.join(localAppData, name, "Log"),
      temp: path2.join(tmpdir, name)
    };
  };
  const linux = (name) => {
    const username = path2.basename(homedir);
    return {
      data: path2.join(env.XDG_DATA_HOME || path2.join(homedir, ".local", "share"), name),
      config: path2.join(env.XDG_CONFIG_HOME || path2.join(homedir, ".config"), name),
      cache: path2.join(env.XDG_CACHE_HOME || path2.join(homedir, ".cache"), name),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: path2.join(env.XDG_STATE_HOME || path2.join(homedir, ".local", "state"), name),
      temp: path2.join(tmpdir, username, name)
    };
  };
  const envPaths$1 = (name, options) => {
    if (typeof name !== "string") {
      throw new TypeError(`Expected string, got ${typeof name}`);
    }
    options = Object.assign({ suffix: "nodejs" }, options);
    if (options.suffix) {
      name += `-${options.suffix}`;
    }
    if (process.platform === "darwin") {
      return macos(name);
    }
    if (process.platform === "win32") {
      return windows(name);
    }
    return linux(name);
  };
  envPaths.exports = envPaths$1;
  envPaths.exports.default = envPaths$1;
  return envPaths.exports;
}
var dist$1 = {};
var consts = {};
var hasRequiredConsts;
function requireConsts() {
  if (hasRequiredConsts) return consts;
  hasRequiredConsts = 1;
  Object.defineProperty(consts, "__esModule", { value: true });
  consts.NOOP = consts.LIMIT_FILES_DESCRIPTORS = consts.LIMIT_BASENAME_LENGTH = consts.IS_USER_ROOT = consts.IS_POSIX = consts.DEFAULT_TIMEOUT_SYNC = consts.DEFAULT_TIMEOUT_ASYNC = consts.DEFAULT_WRITE_OPTIONS = consts.DEFAULT_READ_OPTIONS = consts.DEFAULT_FOLDER_MODE = consts.DEFAULT_FILE_MODE = consts.DEFAULT_ENCODING = void 0;
  const DEFAULT_ENCODING = "utf8";
  consts.DEFAULT_ENCODING = DEFAULT_ENCODING;
  const DEFAULT_FILE_MODE = 438;
  consts.DEFAULT_FILE_MODE = DEFAULT_FILE_MODE;
  const DEFAULT_FOLDER_MODE = 511;
  consts.DEFAULT_FOLDER_MODE = DEFAULT_FOLDER_MODE;
  const DEFAULT_READ_OPTIONS = {};
  consts.DEFAULT_READ_OPTIONS = DEFAULT_READ_OPTIONS;
  const DEFAULT_WRITE_OPTIONS = {};
  consts.DEFAULT_WRITE_OPTIONS = DEFAULT_WRITE_OPTIONS;
  const DEFAULT_TIMEOUT_ASYNC = 5e3;
  consts.DEFAULT_TIMEOUT_ASYNC = DEFAULT_TIMEOUT_ASYNC;
  const DEFAULT_TIMEOUT_SYNC = 100;
  consts.DEFAULT_TIMEOUT_SYNC = DEFAULT_TIMEOUT_SYNC;
  const IS_POSIX = !!process.getuid;
  consts.IS_POSIX = IS_POSIX;
  const IS_USER_ROOT = process.getuid ? !process.getuid() : false;
  consts.IS_USER_ROOT = IS_USER_ROOT;
  const LIMIT_BASENAME_LENGTH = 128;
  consts.LIMIT_BASENAME_LENGTH = LIMIT_BASENAME_LENGTH;
  const LIMIT_FILES_DESCRIPTORS = 1e4;
  consts.LIMIT_FILES_DESCRIPTORS = LIMIT_FILES_DESCRIPTORS;
  const NOOP = () => {
  };
  consts.NOOP = NOOP;
  return consts;
}
var fs = {};
var attemptify = {};
var hasRequiredAttemptify;
function requireAttemptify() {
  if (hasRequiredAttemptify) return attemptify;
  hasRequiredAttemptify = 1;
  Object.defineProperty(attemptify, "__esModule", { value: true });
  attemptify.attemptifySync = attemptify.attemptifyAsync = void 0;
  const consts_1 = requireConsts();
  const attemptifyAsync = (fn, onError = consts_1.NOOP) => {
    return function() {
      return fn.apply(void 0, arguments).catch(onError);
    };
  };
  attemptify.attemptifyAsync = attemptifyAsync;
  const attemptifySync = (fn, onError = consts_1.NOOP) => {
    return function() {
      try {
        return fn.apply(void 0, arguments);
      } catch (error) {
        return onError(error);
      }
    };
  };
  attemptify.attemptifySync = attemptifySync;
  return attemptify;
}
var fs_handlers = {};
var hasRequiredFs_handlers;
function requireFs_handlers() {
  if (hasRequiredFs_handlers) return fs_handlers;
  hasRequiredFs_handlers = 1;
  Object.defineProperty(fs_handlers, "__esModule", { value: true });
  const consts_1 = requireConsts();
  const Handlers = {
    isChangeErrorOk: (error) => {
      const { code: code2 } = error;
      if (code2 === "ENOSYS")
        return true;
      if (!consts_1.IS_USER_ROOT && (code2 === "EINVAL" || code2 === "EPERM"))
        return true;
      return false;
    },
    isRetriableError: (error) => {
      const { code: code2 } = error;
      if (code2 === "EMFILE" || code2 === "ENFILE" || code2 === "EAGAIN" || code2 === "EBUSY" || code2 === "EACCESS" || code2 === "EACCS" || code2 === "EPERM")
        return true;
      return false;
    },
    onChangeError: (error) => {
      if (Handlers.isChangeErrorOk(error))
        return;
      throw error;
    }
  };
  fs_handlers.default = Handlers;
  return fs_handlers;
}
var retryify = {};
var retryify_queue = {};
var hasRequiredRetryify_queue;
function requireRetryify_queue() {
  if (hasRequiredRetryify_queue) return retryify_queue;
  hasRequiredRetryify_queue = 1;
  Object.defineProperty(retryify_queue, "__esModule", { value: true });
  const consts_1 = requireConsts();
  const RetryfyQueue = {
    interval: 25,
    intervalId: void 0,
    limit: consts_1.LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      if (RetryfyQueue.intervalId)
        return;
      RetryfyQueue.intervalId = setInterval(RetryfyQueue.tick, RetryfyQueue.interval);
    },
    reset: () => {
      if (!RetryfyQueue.intervalId)
        return;
      clearInterval(RetryfyQueue.intervalId);
      delete RetryfyQueue.intervalId;
    },
    add: (fn) => {
      RetryfyQueue.queueWaiting.add(fn);
      if (RetryfyQueue.queueActive.size < RetryfyQueue.limit / 2) {
        RetryfyQueue.tick();
      } else {
        RetryfyQueue.init();
      }
    },
    remove: (fn) => {
      RetryfyQueue.queueWaiting.delete(fn);
      RetryfyQueue.queueActive.delete(fn);
    },
    schedule: () => {
      return new Promise((resolve2) => {
        const cleanup = () => RetryfyQueue.remove(resolver);
        const resolver = () => resolve2(cleanup);
        RetryfyQueue.add(resolver);
      });
    },
    tick: () => {
      if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
        return;
      if (!RetryfyQueue.queueWaiting.size)
        return RetryfyQueue.reset();
      for (const fn of RetryfyQueue.queueWaiting) {
        if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
          break;
        RetryfyQueue.queueWaiting.delete(fn);
        RetryfyQueue.queueActive.add(fn);
        fn();
      }
    }
  };
  retryify_queue.default = RetryfyQueue;
  return retryify_queue;
}
var hasRequiredRetryify;
function requireRetryify() {
  if (hasRequiredRetryify) return retryify;
  hasRequiredRetryify = 1;
  Object.defineProperty(retryify, "__esModule", { value: true });
  retryify.retryifySync = retryify.retryifyAsync = void 0;
  const retryify_queue_1 = requireRetryify_queue();
  const retryifyAsync = (fn, isRetriableError) => {
    return function(timestamp) {
      return function attempt() {
        return retryify_queue_1.default.schedule().then((cleanup) => {
          return fn.apply(void 0, arguments).then((result) => {
            cleanup();
            return result;
          }, (error) => {
            cleanup();
            if (Date.now() >= timestamp)
              throw error;
            if (isRetriableError(error)) {
              const delay = Math.round(100 + 400 * Math.random()), delayPromise = new Promise((resolve2) => setTimeout(resolve2, delay));
              return delayPromise.then(() => attempt.apply(void 0, arguments));
            }
            throw error;
          });
        });
      };
    };
  };
  retryify.retryifyAsync = retryifyAsync;
  const retryifySync = (fn, isRetriableError) => {
    return function(timestamp) {
      return function attempt() {
        try {
          return fn.apply(void 0, arguments);
        } catch (error) {
          if (Date.now() > timestamp)
            throw error;
          if (isRetriableError(error))
            return attempt.apply(void 0, arguments);
          throw error;
        }
      };
    };
  };
  retryify.retryifySync = retryifySync;
  return retryify;
}
var hasRequiredFs;
function requireFs() {
  if (hasRequiredFs) return fs;
  hasRequiredFs = 1;
  Object.defineProperty(fs, "__esModule", { value: true });
  const fs$1 = require$$0;
  const util_1 = require$$0$2;
  const attemptify_1 = requireAttemptify();
  const fs_handlers_1 = requireFs_handlers();
  const retryify_1 = requireRetryify();
  const FS = {
    chmodAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.chmod), fs_handlers_1.default.onChangeError),
    chownAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.chown), fs_handlers_1.default.onChangeError),
    closeAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.close)),
    fsyncAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.fsync)),
    mkdirAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.mkdir)),
    realpathAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.realpath)),
    statAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.stat)),
    unlinkAttempt: attemptify_1.attemptifyAsync(util_1.promisify(fs$1.unlink)),
    closeRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.close), fs_handlers_1.default.isRetriableError),
    fsyncRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.fsync), fs_handlers_1.default.isRetriableError),
    openRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.open), fs_handlers_1.default.isRetriableError),
    readFileRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.readFile), fs_handlers_1.default.isRetriableError),
    renameRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.rename), fs_handlers_1.default.isRetriableError),
    statRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.stat), fs_handlers_1.default.isRetriableError),
    writeRetry: retryify_1.retryifyAsync(util_1.promisify(fs$1.write), fs_handlers_1.default.isRetriableError),
    chmodSyncAttempt: attemptify_1.attemptifySync(fs$1.chmodSync, fs_handlers_1.default.onChangeError),
    chownSyncAttempt: attemptify_1.attemptifySync(fs$1.chownSync, fs_handlers_1.default.onChangeError),
    closeSyncAttempt: attemptify_1.attemptifySync(fs$1.closeSync),
    mkdirSyncAttempt: attemptify_1.attemptifySync(fs$1.mkdirSync),
    realpathSyncAttempt: attemptify_1.attemptifySync(fs$1.realpathSync),
    statSyncAttempt: attemptify_1.attemptifySync(fs$1.statSync),
    unlinkSyncAttempt: attemptify_1.attemptifySync(fs$1.unlinkSync),
    closeSyncRetry: retryify_1.retryifySync(fs$1.closeSync, fs_handlers_1.default.isRetriableError),
    fsyncSyncRetry: retryify_1.retryifySync(fs$1.fsyncSync, fs_handlers_1.default.isRetriableError),
    openSyncRetry: retryify_1.retryifySync(fs$1.openSync, fs_handlers_1.default.isRetriableError),
    readFileSyncRetry: retryify_1.retryifySync(fs$1.readFileSync, fs_handlers_1.default.isRetriableError),
    renameSyncRetry: retryify_1.retryifySync(fs$1.renameSync, fs_handlers_1.default.isRetriableError),
    statSyncRetry: retryify_1.retryifySync(fs$1.statSync, fs_handlers_1.default.isRetriableError),
    writeSyncRetry: retryify_1.retryifySync(fs$1.writeSync, fs_handlers_1.default.isRetriableError)
  };
  fs.default = FS;
  return fs;
}
var lang = {};
var hasRequiredLang;
function requireLang() {
  if (hasRequiredLang) return lang;
  hasRequiredLang = 1;
  Object.defineProperty(lang, "__esModule", { value: true });
  const Lang = {
    isFunction: (x) => {
      return typeof x === "function";
    },
    isString: (x) => {
      return typeof x === "string";
    },
    isUndefined: (x) => {
      return typeof x === "undefined";
    }
  };
  lang.default = Lang;
  return lang;
}
var scheduler = {};
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler;
  hasRequiredScheduler = 1;
  Object.defineProperty(scheduler, "__esModule", { value: true });
  const Queues = {};
  const Scheduler = {
    next: (id2) => {
      const queue = Queues[id2];
      if (!queue)
        return;
      queue.shift();
      const job = queue[0];
      if (job) {
        job(() => Scheduler.next(id2));
      } else {
        delete Queues[id2];
      }
    },
    schedule: (id2) => {
      return new Promise((resolve2) => {
        let queue = Queues[id2];
        if (!queue)
          queue = Queues[id2] = [];
        queue.push(resolve2);
        if (queue.length > 1)
          return;
        resolve2(() => Scheduler.next(id2));
      });
    }
  };
  scheduler.default = Scheduler;
  return scheduler;
}
var temp = {};
var hasRequiredTemp;
function requireTemp() {
  if (hasRequiredTemp) return temp;
  hasRequiredTemp = 1;
  Object.defineProperty(temp, "__esModule", { value: true });
  const path2 = require$$0$1;
  const consts_1 = requireConsts();
  const fs_1 = requireFs();
  const Temp = {
    store: {},
    create: (filePath) => {
      const randomness = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), timestamp = Date.now().toString().slice(-10), prefix = "tmp-", suffix = `.${prefix}${timestamp}${randomness}`, tempPath = `${filePath}${suffix}`;
      return tempPath;
    },
    get: (filePath, creator, purge = true) => {
      const tempPath = Temp.truncate(creator(filePath));
      if (tempPath in Temp.store)
        return Temp.get(filePath, creator, purge);
      Temp.store[tempPath] = purge;
      const disposer = () => delete Temp.store[tempPath];
      return [tempPath, disposer];
    },
    purge: (filePath) => {
      if (!Temp.store[filePath])
        return;
      delete Temp.store[filePath];
      fs_1.default.unlinkAttempt(filePath);
    },
    purgeSync: (filePath) => {
      if (!Temp.store[filePath])
        return;
      delete Temp.store[filePath];
      fs_1.default.unlinkSyncAttempt(filePath);
    },
    purgeSyncAll: () => {
      for (const filePath in Temp.store) {
        Temp.purgeSync(filePath);
      }
    },
    truncate: (filePath) => {
      const basename = path2.basename(filePath);
      if (basename.length <= consts_1.LIMIT_BASENAME_LENGTH)
        return filePath;
      const truncable = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(basename);
      if (!truncable)
        return filePath;
      const truncationLength = basename.length - consts_1.LIMIT_BASENAME_LENGTH;
      return `${filePath.slice(0, -basename.length)}${truncable[1]}${truncable[2].slice(0, -truncationLength)}${truncable[3]}`;
    }
  };
  process.on("exit", Temp.purgeSyncAll);
  temp.default = Temp;
  return temp;
}
var hasRequiredDist$1;
function requireDist$1() {
  if (hasRequiredDist$1) return dist$1;
  hasRequiredDist$1 = 1;
  Object.defineProperty(dist$1, "__esModule", { value: true });
  dist$1.writeFileSync = dist$1.writeFile = dist$1.readFileSync = dist$1.readFile = void 0;
  const path2 = require$$0$1;
  const consts_1 = requireConsts();
  const fs_1 = requireFs();
  const lang_1 = requireLang();
  const scheduler_1 = requireScheduler();
  const temp_1 = requireTemp();
  function readFile(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
    var _a;
    if (lang_1.default.isString(options))
      return readFile(filePath, { encoding: options });
    const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
    return fs_1.default.readFileRetry(timeout)(filePath, options);
  }
  dist$1.readFile = readFile;
  function readFileSync(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
    var _a;
    if (lang_1.default.isString(options))
      return readFileSync(filePath, { encoding: options });
    const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
    return fs_1.default.readFileSyncRetry(timeout)(filePath, options);
  }
  dist$1.readFileSync = readFileSync;
  const writeFile = (filePath, data, options, callback) => {
    if (lang_1.default.isFunction(options))
      return writeFile(filePath, data, consts_1.DEFAULT_WRITE_OPTIONS, options);
    const promise = writeFileAsync(filePath, data, options);
    if (callback)
      promise.then(callback, callback);
    return promise;
  };
  dist$1.writeFile = writeFile;
  const writeFileAsync = async (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
    var _a;
    if (lang_1.default.isString(options))
      return writeFileAsync(filePath, data, { encoding: options });
    const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
    let schedulerCustomDisposer = null, schedulerDisposer = null, tempDisposer = null, tempPath = null, fd = null;
    try {
      if (options.schedule)
        schedulerCustomDisposer = await options.schedule(filePath);
      schedulerDisposer = await scheduler_1.default.schedule(filePath);
      filePath = await fs_1.default.realpathAttempt(filePath) || filePath;
      [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
      const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
      if (useStatChown || useStatMode) {
        const stat = await fs_1.default.statAttempt(filePath);
        if (stat) {
          options = { ...options };
          if (useStatChown)
            options.chown = { uid: stat.uid, gid: stat.gid };
          if (useStatMode)
            options.mode = stat.mode;
        }
      }
      const parentPath = path2.dirname(filePath);
      await fs_1.default.mkdirAttempt(parentPath, {
        mode: consts_1.DEFAULT_FOLDER_MODE,
        recursive: true
      });
      fd = await fs_1.default.openRetry(timeout)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
      if (options.tmpCreated)
        options.tmpCreated(tempPath);
      if (lang_1.default.isString(data)) {
        await fs_1.default.writeRetry(timeout)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
      } else if (!lang_1.default.isUndefined(data)) {
        await fs_1.default.writeRetry(timeout)(fd, data, 0, data.length, 0);
      }
      if (options.fsync !== false) {
        if (options.fsyncWait !== false) {
          await fs_1.default.fsyncRetry(timeout)(fd);
        } else {
          fs_1.default.fsyncAttempt(fd);
        }
      }
      await fs_1.default.closeRetry(timeout)(fd);
      fd = null;
      if (options.chown)
        await fs_1.default.chownAttempt(tempPath, options.chown.uid, options.chown.gid);
      if (options.mode)
        await fs_1.default.chmodAttempt(tempPath, options.mode);
      try {
        await fs_1.default.renameRetry(timeout)(tempPath, filePath);
      } catch (error) {
        if (error.code !== "ENAMETOOLONG")
          throw error;
        await fs_1.default.renameRetry(timeout)(tempPath, temp_1.default.truncate(filePath));
      }
      tempDisposer();
      tempPath = null;
    } finally {
      if (fd)
        await fs_1.default.closeAttempt(fd);
      if (tempPath)
        temp_1.default.purge(tempPath);
      if (schedulerCustomDisposer)
        schedulerCustomDisposer();
      if (schedulerDisposer)
        schedulerDisposer();
    }
  };
  const writeFileSync = (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
    var _a;
    if (lang_1.default.isString(options))
      return writeFileSync(filePath, data, { encoding: options });
    const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
    let tempDisposer = null, tempPath = null, fd = null;
    try {
      filePath = fs_1.default.realpathSyncAttempt(filePath) || filePath;
      [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
      const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
      if (useStatChown || useStatMode) {
        const stat = fs_1.default.statSyncAttempt(filePath);
        if (stat) {
          options = { ...options };
          if (useStatChown)
            options.chown = { uid: stat.uid, gid: stat.gid };
          if (useStatMode)
            options.mode = stat.mode;
        }
      }
      const parentPath = path2.dirname(filePath);
      fs_1.default.mkdirSyncAttempt(parentPath, {
        mode: consts_1.DEFAULT_FOLDER_MODE,
        recursive: true
      });
      fd = fs_1.default.openSyncRetry(timeout)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
      if (options.tmpCreated)
        options.tmpCreated(tempPath);
      if (lang_1.default.isString(data)) {
        fs_1.default.writeSyncRetry(timeout)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
      } else if (!lang_1.default.isUndefined(data)) {
        fs_1.default.writeSyncRetry(timeout)(fd, data, 0, data.length, 0);
      }
      if (options.fsync !== false) {
        if (options.fsyncWait !== false) {
          fs_1.default.fsyncSyncRetry(timeout)(fd);
        } else {
          fs_1.default.fsyncAttempt(fd);
        }
      }
      fs_1.default.closeSyncRetry(timeout)(fd);
      fd = null;
      if (options.chown)
        fs_1.default.chownSyncAttempt(tempPath, options.chown.uid, options.chown.gid);
      if (options.mode)
        fs_1.default.chmodSyncAttempt(tempPath, options.mode);
      try {
        fs_1.default.renameSyncRetry(timeout)(tempPath, filePath);
      } catch (error) {
        if (error.code !== "ENAMETOOLONG")
          throw error;
        fs_1.default.renameSyncRetry(timeout)(tempPath, temp_1.default.truncate(filePath));
      }
      tempDisposer();
      tempPath = null;
    } finally {
      if (fd)
        fs_1.default.closeSyncAttempt(fd);
      if (tempPath)
        temp_1.default.purge(tempPath);
    }
  };
  dist$1.writeFileSync = writeFileSync;
  return dist$1;
}
var ajv$1 = { exports: {} };
var core$3 = {};
var validate$1 = {};
var boolSchema$1 = {};
var errors$1 = {};
var codegen$1 = {};
var code$3 = {};
var hasRequiredCode$3;
function requireCode$3() {
  if (hasRequiredCode$3) return code$3;
  hasRequiredCode$3 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    class _CodeOrName {
    }
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class Name extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    exports.Name = Name;
    class _Code extends _CodeOrName {
      constructor(code2) {
        super();
        this._items = typeof code2 === "string" ? [code2] : code2;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
          if (c instanceof Name)
            names2[c.str] = (names2[c.str] || 0) + 1;
          return names2;
        }, {});
      }
    }
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code2 = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code2, args[i]);
        code2.push(strs[++i]);
      }
      return new _Code(code2);
    }
    exports._ = _;
    const plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code2, arg) {
      if (arg instanceof _Code)
        code2.push(...arg._items);
      else if (arg instanceof Name)
        code2.push(arg);
      else
        code2.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  })(code$3);
  return code$3;
}
var scope$2 = {};
var hasRequiredScope$2;
function requireScope$2() {
  if (hasRequiredScope$2) return scope$2;
  hasRequiredScope$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    const code_1 = requireCode$3();
    class ValueError extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    }
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    class Scope {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    }
    exports.Scope = Scope;
    class ValueScopeName extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    }
    exports.ValueScopeName = ValueScopeName;
    const line = (0, code_1._)`\n`;
    class ValueScope extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code2 = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code2 = (0, code_1._)`${code2}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code2 = (0, code_1._)`${code2}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code2;
      }
    }
    exports.ValueScope = ValueScope;
  })(scope$2);
  return scope$2;
}
var hasRequiredCodegen$1;
function requireCodegen$1() {
  if (hasRequiredCodegen$1) return codegen$1;
  hasRequiredCodegen$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    const code_1 = requireCode$3();
    const scope_1 = requireScope$2();
    var code_2 = requireCode$3();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = requireScope$2();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    class Node {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    }
    class Def extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names2, constants2) {
        if (!names2[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names2, constants2);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    }
    class Assign extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names2, constants2) {
        if (this.lhs instanceof code_1.Name && !names2[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
        return this;
      }
      get names() {
        const names2 = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names2, this.rhs);
      }
    }
    class AssignOp extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    }
    class Label extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    }
    class Break extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    }
    class Throw extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    }
    class AnyCode extends Node {
      constructor(code2) {
        super();
        this.code = code2;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names2, constants2) {
        this.code = optimizeExpr(this.code, names2, constants2);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    }
    class ParentNode extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code2, n) => code2 + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names2, constants2) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names2, constants2))
            continue;
          subtractNames(names2, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
      }
    }
    class BlockNode extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    }
    class Root extends ParentNode {
    }
    class Else extends BlockNode {
    }
    Else.kind = "else";
    class If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code2 = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code2 += "else " + this.else.render(opts);
        return code2;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new If(not2(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names2, constants2) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
        if (!(super.optimizeNames(names2, constants2) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names2, constants2);
        return this;
      }
      get names() {
        const names2 = super.names;
        addExprNames(names2, this.condition);
        if (this.else)
          addNames(names2, this.else.names);
        return names2;
      }
    }
    If.kind = "if";
    class For extends BlockNode {
    }
    For.kind = "for";
    class ForLoop extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names2, constants2) {
        if (!super.optimizeNames(names2, constants2))
          return;
        this.iteration = optimizeExpr(this.iteration, names2, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    }
    class ForRange extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names2 = addExprNames(super.names, this.from);
        return addExprNames(names2, this.to);
      }
    }
    class ForIter extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names2, constants2) {
        if (!super.optimizeNames(names2, constants2))
          return;
        this.iterable = optimizeExpr(this.iterable, names2, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    }
    class Func extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    }
    Func.kind = "func";
    class Return extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    }
    Return.kind = "return";
    class Try extends BlockNode {
      render(opts) {
        let code2 = "try" + super.render(opts);
        if (this.catch)
          code2 += this.catch.render(opts);
        if (this.finally)
          code2 += this.finally.render(opts);
        return code2;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names2, constants2) {
        var _a, _b;
        super.optimizeNames(names2, constants2);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
        return this;
      }
      get names() {
        const names2 = super.names;
        if (this.catch)
          addNames(names2, this.catch.names);
        if (this.finally)
          addNames(names2, this.finally.names);
        return names2;
      }
    }
    class Catch extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    }
    Catch.kind = "catch";
    class Finally extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    }
    Finally.kind = "finally";
    class CodeGen {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code2 = ["{"];
        for (const [key, value] of keyValues) {
          if (code2.length > 1)
            code2.push(",");
          code2.push(key);
          if (key !== value || this.opts.es5) {
            code2.push(":");
            (0, code_1.addCodeArg)(code2, value);
          }
        }
        code2.push("}");
        return new code_1._Code(code2);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node2, forBody) {
        this._blockNode(node2);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node2 = new Return();
        this._blockNode(node2);
        this.code(value);
        if (node2.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node2 = new Try();
        this._blockNode(node2);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node2.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node2.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node2) {
        this._currNode.nodes.push(node2);
        return this;
      }
      _blockNode(node2) {
        this._currNode.nodes.push(node2);
        this._nodes.push(node2);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node2) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node2;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node2) {
        const ns = this._nodes;
        ns[ns.length - 1] = node2;
      }
    }
    exports.CodeGen = CodeGen;
    function addNames(names2, from) {
      for (const n in from)
        names2[n] = (names2[n] || 0) + (from[n] || 0);
      return names2;
    }
    function addExprNames(names2, from) {
      return from instanceof code_1._CodeOrName ? addNames(names2, from.names) : names2;
    }
    function optimizeExpr(expr, names2, constants2) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items2, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items2.push(...c._items);
        else
          items2.push(c);
        return items2;
      }, []));
      function replaceName(n) {
        const c = constants2[n.str];
        if (c === void 0 || names2[n.str] !== 1)
          return n;
        delete names2[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
      }
    }
    function subtractNames(names2, from) {
      for (const n in from)
        names2[n] = (names2[n] || 0) - (from[n] || 0);
    }
    function not2(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not2;
    const andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    const orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  })(codegen$1);
  return codegen$1;
}
var util$1 = {};
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util$1;
  hasRequiredUtil$1 = 1;
  Object.defineProperty(util$1, "__esModule", { value: true });
  util$1.checkStrictMode = util$1.getErrorPath = util$1.Type = util$1.useFunc = util$1.setEvaluated = util$1.evaluatedPropsToName = util$1.mergeEvaluated = util$1.eachItem = util$1.unescapeJsonPointer = util$1.escapeJsonPointer = util$1.escapeFragment = util$1.unescapeFragment = util$1.schemaRefOrVal = util$1.schemaHasRulesButRef = util$1.schemaHasRules = util$1.checkUnknownRules = util$1.alwaysValidSchema = util$1.toHash = void 0;
  const codegen_1 = requireCodegen$1();
  const code_1 = requireCode$3();
  function toHash(arr) {
    const hash = {};
    for (const item of arr)
      hash[item] = true;
    return hash;
  }
  util$1.toHash = toHash;
  function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
      return schema;
    if (Object.keys(schema).length === 0)
      return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
  }
  util$1.alwaysValidSchema = alwaysValidSchema;
  function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
      return;
    if (typeof schema === "boolean")
      return;
    const rules2 = self.RULES.keywords;
    for (const key in schema) {
      if (!rules2[key])
        checkStrictMode(it, `unknown keyword: "${key}"`);
    }
  }
  util$1.checkUnknownRules = checkUnknownRules;
  function schemaHasRules(schema, rules2) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (rules2[key])
        return true;
    return false;
  }
  util$1.schemaHasRules = schemaHasRules;
  function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (key !== "$ref" && RULES.all[key])
        return true;
    return false;
  }
  util$1.schemaHasRulesButRef = schemaHasRulesButRef;
  function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword2, $data) {
    if (!$data) {
      if (typeof schema == "number" || typeof schema == "boolean")
        return schema;
      if (typeof schema == "string")
        return (0, codegen_1._)`${schema}`;
    }
    return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword2)}`;
  }
  util$1.schemaRefOrVal = schemaRefOrVal;
  function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
  }
  util$1.unescapeFragment = unescapeFragment;
  function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
  }
  util$1.escapeFragment = escapeFragment;
  function escapeJsonPointer(str) {
    if (typeof str == "number")
      return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  util$1.escapeJsonPointer = escapeJsonPointer;
  function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  util$1.unescapeJsonPointer = unescapeJsonPointer;
  function eachItem(xs, f) {
    if (Array.isArray(xs)) {
      for (const x of xs)
        f(x);
    } else {
      f(xs);
    }
  }
  util$1.eachItem = eachItem;
  function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
    return (gen, from, to, toName) => {
      const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
      return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
  }
  util$1.mergeEvaluated = {
    props: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
        gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
      }),
      mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
        if (from === true) {
          gen.assign(to, true);
        } else {
          gen.assign(to, (0, codegen_1._)`${to} || {}`);
          setEvaluated(gen, to, from);
        }
      }),
      mergeValues: (from, to) => from === true ? true : { ...from, ...to },
      resultToName: evaluatedPropsToName
    }),
    items: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
      mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
      mergeValues: (from, to) => from === true ? true : Math.max(from, to),
      resultToName: (gen, items2) => gen.var("items", items2)
    })
  };
  function evaluatedPropsToName(gen, ps) {
    if (ps === true)
      return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._)`{}`);
    if (ps !== void 0)
      setEvaluated(gen, props, ps);
    return props;
  }
  util$1.evaluatedPropsToName = evaluatedPropsToName;
  function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
  }
  util$1.setEvaluated = setEvaluated;
  const snippets = {};
  function useFunc(gen, f) {
    return gen.scopeValue("func", {
      ref: f,
      code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
    });
  }
  util$1.useFunc = useFunc;
  var Type;
  (function(Type2) {
    Type2[Type2["Num"] = 0] = "Num";
    Type2[Type2["Str"] = 1] = "Str";
  })(Type || (util$1.Type = Type = {}));
  function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    if (dataProp instanceof codegen_1.Name) {
      const isNumber = dataPropType === Type.Num;
      return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
  }
  util$1.getErrorPath = getErrorPath;
  function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
      return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
      throw new Error(msg);
    it.self.logger.warn(msg);
  }
  util$1.checkStrictMode = checkStrictMode;
  return util$1;
}
var names$1 = {};
var hasRequiredNames$1;
function requireNames$1() {
  if (hasRequiredNames$1) return names$1;
  hasRequiredNames$1 = 1;
  Object.defineProperty(names$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const names2 = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    // null or array of validation errors
    errors: new codegen_1.Name("errors"),
    // counter of validation errors
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart")
  };
  names$1.default = names2;
  return names$1;
}
var hasRequiredErrors$1;
function requireErrors$1() {
  if (hasRequiredErrors$1) return errors$1;
  hasRequiredErrors$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    const codegen_1 = requireCodegen$1();
    const util_1 = requireUtil$1();
    const names_1 = requireNames$1();
    exports.keywordError = {
      message: ({ keyword: keyword2 }) => (0, codegen_1.str)`must pass "${keyword2}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword: keyword2, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword2}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword2}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword2}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    const E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword2}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword: keyword2, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  })(errors$1);
  return errors$1;
}
var hasRequiredBoolSchema$1;
function requireBoolSchema$1() {
  if (hasRequiredBoolSchema$1) return boolSchema$1;
  hasRequiredBoolSchema$1 = 1;
  Object.defineProperty(boolSchema$1, "__esModule", { value: true });
  boolSchema$1.boolOrEmptySchema = boolSchema$1.topBoolOrEmptySchema = void 0;
  const errors_1 = requireErrors$1();
  const codegen_1 = requireCodegen$1();
  const names_1 = requireNames$1();
  const boolError = {
    message: "boolean schema is false"
  };
  function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
      falseSchemaError(it, false);
    } else if (typeof schema == "object" && schema.$async === true) {
      gen.return(names_1.default.data);
    } else {
      gen.assign((0, codegen_1._)`${validateName}.errors`, null);
      gen.return(true);
    }
  }
  boolSchema$1.topBoolOrEmptySchema = topBoolOrEmptySchema;
  function boolOrEmptySchema(it, valid2) {
    const { gen, schema } = it;
    if (schema === false) {
      gen.var(valid2, false);
      falseSchemaError(it);
    } else {
      gen.var(valid2, true);
    }
  }
  boolSchema$1.boolOrEmptySchema = boolOrEmptySchema;
  function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    const cxt = {
      gen,
      keyword: "false schema",
      data,
      schema: false,
      schemaCode: false,
      schemaValue: false,
      params: {},
      it
    };
    (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
  }
  return boolSchema$1;
}
var dataType$1 = {};
var rules$1 = {};
var hasRequiredRules$1;
function requireRules$1() {
  if (hasRequiredRules$1) return rules$1;
  hasRequiredRules$1 = 1;
  Object.defineProperty(rules$1, "__esModule", { value: true });
  rules$1.getRules = rules$1.isJSONType = void 0;
  const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
  const jsonTypes = new Set(_jsonTypes);
  function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
  }
  rules$1.isJSONType = isJSONType;
  function getRules() {
    const groups = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...groups, integer: true, boolean: true, null: true },
      rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  rules$1.getRules = getRules;
  return rules$1;
}
var applicability$1 = {};
var hasRequiredApplicability$1;
function requireApplicability$1() {
  if (hasRequiredApplicability$1) return applicability$1;
  hasRequiredApplicability$1 = 1;
  Object.defineProperty(applicability$1, "__esModule", { value: true });
  applicability$1.shouldUseRule = applicability$1.shouldUseGroup = applicability$1.schemaHasRulesForType = void 0;
  function schemaHasRulesForType({ schema, self }, type2) {
    const group = self.RULES.types[type2];
    return group && group !== true && shouldUseGroup(schema, group);
  }
  applicability$1.schemaHasRulesForType = schemaHasRulesForType;
  function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
  }
  applicability$1.shouldUseGroup = shouldUseGroup;
  function shouldUseRule(schema, rule) {
    var _a;
    return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
  }
  applicability$1.shouldUseRule = shouldUseRule;
  return applicability$1;
}
var hasRequiredDataType$1;
function requireDataType$1() {
  if (hasRequiredDataType$1) return dataType$1;
  hasRequiredDataType$1 = 1;
  Object.defineProperty(dataType$1, "__esModule", { value: true });
  dataType$1.reportTypeError = dataType$1.checkDataTypes = dataType$1.checkDataType = dataType$1.coerceAndCheckDataType = dataType$1.getJSONTypes = dataType$1.getSchemaTypes = dataType$1.DataType = void 0;
  const rules_1 = requireRules$1();
  const applicability_1 = requireApplicability$1();
  const errors_1 = requireErrors$1();
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  var DataType;
  (function(DataType2) {
    DataType2[DataType2["Correct"] = 0] = "Correct";
    DataType2[DataType2["Wrong"] = 1] = "Wrong";
  })(DataType || (dataType$1.DataType = DataType = {}));
  function getSchemaTypes(schema) {
    const types2 = getJSONTypes(schema.type);
    const hasNull = types2.includes("null");
    if (hasNull) {
      if (schema.nullable === false)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!types2.length && schema.nullable !== void 0) {
        throw new Error('"nullable" cannot be used without "type"');
      }
      if (schema.nullable === true)
        types2.push("null");
    }
    return types2;
  }
  dataType$1.getSchemaTypes = getSchemaTypes;
  function getJSONTypes(ts) {
    const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types2.every(rules_1.isJSONType))
      return types2;
    throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
  }
  dataType$1.getJSONTypes = getJSONTypes;
  function coerceAndCheckDataType(it, types2) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types2, opts.coerceTypes);
    const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types2[0]));
    if (checkTypes) {
      const wrongType = checkDataTypes(types2, data, opts.strictNumbers, DataType.Wrong);
      gen.if(wrongType, () => {
        if (coerceTo.length)
          coerceData(it, types2, coerceTo);
        else
          reportTypeError(it);
      });
    }
    return checkTypes;
  }
  dataType$1.coerceAndCheckDataType = coerceAndCheckDataType;
  const COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function coerceToTypes(types2, coerceTypes) {
    return coerceTypes ? types2.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
  }
  function coerceData(it, types2, coerceTo) {
    const { gen, data, opts } = it;
    const dataType2 = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
    if (opts.coerceTypes === "array") {
      gen.if((0, codegen_1._)`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType2, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types2, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._)`${coerced} !== undefined`);
    for (const t of coerceTo) {
      if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
        coerceSpecificType(t);
      }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
      gen.assign(data, coerced);
      assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
      switch (t) {
        case "string":
          gen.elseIf((0, codegen_1._)`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
          return;
        case "number":
          gen.elseIf((0, codegen_1._)`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
          return;
        case "integer":
          gen.elseIf((0, codegen_1._)`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
          return;
        case "boolean":
          gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
          return;
        case "null":
          gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
          gen.assign(coerced, null);
          return;
        case "array":
          gen.elseIf((0, codegen_1._)`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
      }
    }
  }
  function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
  }
  function checkDataType(dataType2, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType2) {
      case "null":
        return (0, codegen_1._)`${data} ${EQ} null`;
      case "array":
        cond = (0, codegen_1._)`Array.isArray(${data})`;
        break;
      case "object":
        cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
        break;
      case "integer":
        cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
        break;
      case "number":
        cond = numCond();
        break;
      default:
        return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType2}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
      return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
    }
  }
  dataType$1.checkDataType = checkDataType;
  function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
      return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types2 = (0, util_1.toHash)(dataTypes);
    if (types2.array && types2.object) {
      const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
      cond = types2.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
      delete types2.null;
      delete types2.array;
      delete types2.object;
    } else {
      cond = codegen_1.nil;
    }
    if (types2.number)
      delete types2.integer;
    for (const t in types2)
      cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
  }
  dataType$1.checkDataTypes = checkDataTypes;
  const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
  };
  function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
  }
  dataType$1.reportTypeError = reportTypeError;
  function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
      gen,
      keyword: "type",
      data,
      schema: schema.type,
      schemaCode,
      schemaValue: schemaCode,
      parentSchema: schema,
      params: {},
      it
    };
  }
  return dataType$1;
}
var defaults$1 = {};
var hasRequiredDefaults$1;
function requireDefaults$1() {
  if (hasRequiredDefaults$1) return defaults$1;
  hasRequiredDefaults$1 = 1;
  Object.defineProperty(defaults$1, "__esModule", { value: true });
  defaults$1.assignDefaults = void 0;
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  function assignDefaults(it, ty) {
    const { properties: properties2, items: items2 } = it.schema;
    if (ty === "object" && properties2) {
      for (const key in properties2) {
        assignDefault(it, key, properties2[key].default);
      }
    } else if (ty === "array" && Array.isArray(items2)) {
      items2.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
  }
  defaults$1.assignDefaults = assignDefaults;
  function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === void 0)
      return;
    const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
      (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
      return;
    }
    let condition = (0, codegen_1._)`${childData} === undefined`;
    if (opts.useDefaults === "empty") {
      condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
    }
    gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
  }
  return defaults$1;
}
var keyword$1 = {};
var code$2 = {};
var hasRequiredCode$2;
function requireCode$2() {
  if (hasRequiredCode$2) return code$2;
  hasRequiredCode$2 = 1;
  Object.defineProperty(code$2, "__esModule", { value: true });
  code$2.validateUnion = code$2.validateArray = code$2.usePattern = code$2.callValidateCode = code$2.schemaProperties = code$2.allSchemaProperties = code$2.noPropertyInData = code$2.propertyInData = code$2.isOwnProperty = code$2.hasPropFunc = code$2.reportMissingProp = code$2.checkMissingProp = code$2.checkReportMissingProp = void 0;
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const names_1 = requireNames$1();
  const util_2 = requireUtil$1();
  function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
      cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
      cxt.error();
    });
  }
  code$2.checkReportMissingProp = checkReportMissingProp;
  function checkMissingProp({ gen, data, it: { opts } }, properties2, missing) {
    return (0, codegen_1.or)(...properties2.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
  }
  code$2.checkMissingProp = checkMissingProp;
  function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
  }
  code$2.reportMissingProp = reportMissingProp;
  function hasPropFunc(gen) {
    return gen.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
    });
  }
  code$2.hasPropFunc = hasPropFunc;
  function isOwnProperty(gen, data, property) {
    return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
  }
  code$2.isOwnProperty = isOwnProperty;
  function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
  }
  code$2.propertyInData = propertyInData;
  function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
  }
  code$2.noPropertyInData = noPropertyInData;
  function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
  }
  code$2.allSchemaProperties = allSchemaProperties;
  function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
  }
  code$2.schemaProperties = schemaProperties;
  function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
      [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
      [names_1.default.parentData, it.parentData],
      [names_1.default.parentDataProperty, it.parentDataProperty],
      [names_1.default.rootData, names_1.default.rootData]
    ];
    if (it.opts.dynamicRef)
      valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
  }
  code$2.callValidateCode = callValidateCode;
  const newRegExp = (0, codegen_1._)`new RegExp`;
  function usePattern({ gen, it: { opts } }, pattern2) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern2, u);
    return gen.scopeValue("pattern", {
      key: rx.toString(),
      ref: rx,
      code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern2}, ${u})`
    });
  }
  code$2.usePattern = usePattern;
  function validateArray(cxt) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid2 = gen.name("valid");
    if (it.allErrors) {
      const validArr = gen.let("valid", true);
      validateItems(() => gen.assign(validArr, false));
      return validArr;
    }
    gen.var(valid2, true);
    validateItems(() => gen.break());
    return valid2;
    function validateItems(notValid) {
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      gen.forRange("i", 0, len, (i) => {
        cxt.subschema({
          keyword: keyword2,
          dataProp: i,
          dataPropType: util_1.Type.Num
        }, valid2);
        gen.if((0, codegen_1.not)(valid2), notValid);
      });
    }
  }
  code$2.validateArray = validateArray;
  function validateUnion(cxt) {
    const { gen, schema, keyword: keyword2, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
      return;
    const valid2 = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
      const schCxt = cxt.subschema({
        keyword: keyword2,
        schemaProp: i,
        compositeRule: true
      }, schValid);
      gen.assign(valid2, (0, codegen_1._)`${valid2} || ${schValid}`);
      const merged = cxt.mergeValidEvaluated(schCxt, schValid);
      if (!merged)
        gen.if((0, codegen_1.not)(valid2));
    }));
    cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
  }
  code$2.validateUnion = validateUnion;
  return code$2;
}
var hasRequiredKeyword$1;
function requireKeyword$1() {
  if (hasRequiredKeyword$1) return keyword$1;
  hasRequiredKeyword$1 = 1;
  Object.defineProperty(keyword$1, "__esModule", { value: true });
  keyword$1.validateKeywordUsage = keyword$1.validSchemaType = keyword$1.funcKeywordCode = keyword$1.macroKeywordCode = void 0;
  const codegen_1 = requireCodegen$1();
  const names_1 = requireNames$1();
  const code_1 = requireCode$2();
  const errors_1 = requireErrors$1();
  function macroKeywordCode(cxt, def) {
    const { gen, keyword: keyword2, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword2, macroSchema);
    if (it.opts.validateSchema !== false)
      it.self.validateSchema(macroSchema, true);
    const valid2 = gen.name("valid");
    cxt.subschema({
      schema: macroSchema,
      schemaPath: codegen_1.nil,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
      topSchemaRef: schemaRef,
      compositeRule: true
    }, valid2);
    cxt.pass(valid2, () => cxt.error(true));
  }
  keyword$1.macroKeywordCode = macroKeywordCode;
  function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword: keyword2, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate2 = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword2, validate2);
    const valid2 = gen.let("valid");
    cxt.block$data(valid2, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid2);
    function validateKeyword() {
      if (def.errors === false) {
        assignValid();
        if (def.modifying)
          modifyData(cxt);
        reportErrs(() => cxt.error());
      } else {
        const ruleErrs = def.async ? validateAsync() : validateSync();
        if (def.modifying)
          modifyData(cxt);
        reportErrs(() => addErrs(cxt, ruleErrs));
      }
    }
    function validateAsync() {
      const ruleErrs = gen.let("ruleErrs", null);
      gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid2, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
      return ruleErrs;
    }
    function validateSync() {
      const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
      gen.assign(validateErrs, null);
      assignValid(codegen_1.nil);
      return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
      const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
      const passSchema = !("compile" in def && !$data || def.schema === false);
      gen.assign(valid2, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors2) {
      var _a2;
      gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid2), errors2);
    }
  }
  keyword$1.funcKeywordCode = funcKeywordCode;
  function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
  }
  function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
      gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
  }
  function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
      throw new Error("async keyword in sync schema");
  }
  function useKeyword(gen, keyword2, result) {
    if (result === void 0)
      throw new Error(`keyword "${keyword2}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
  }
  function validSchemaType(schema, schemaType, allowUndefined = false) {
    return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
  }
  keyword$1.validSchemaType = validSchemaType;
  function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword2) {
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword2) : def.keyword !== keyword2) {
      throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
      throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
      const valid2 = def.validateSchema(schema[keyword2]);
      if (!valid2) {
        const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
        if (opts.validateSchema === "log")
          self.logger.error(msg);
        else
          throw new Error(msg);
      }
    }
  }
  keyword$1.validateKeywordUsage = validateKeywordUsage;
  return keyword$1;
}
var subschema$1 = {};
var hasRequiredSubschema$1;
function requireSubschema$1() {
  if (hasRequiredSubschema$1) return subschema$1;
  hasRequiredSubschema$1 = 1;
  Object.defineProperty(subschema$1, "__esModule", { value: true });
  subschema$1.extendSubschemaMode = subschema$1.extendSubschemaData = subschema$1.getSubschema = void 0;
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  function getSubschema(it, { keyword: keyword2, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword2 !== void 0 && schema !== void 0) {
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword2 !== void 0) {
      const sch = it.schema[keyword2];
      return schemaProp === void 0 ? {
        schema: sch,
        schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword2)}`,
        errSchemaPath: `${it.errSchemaPath}/${keyword2}`
      } : {
        schema: sch[schemaProp],
        schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword2)}${(0, codegen_1.getProperty)(schemaProp)}`,
        errSchemaPath: `${it.errSchemaPath}/${keyword2}/${(0, util_1.escapeFragment)(schemaProp)}`
      };
    }
    if (schema !== void 0) {
      if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      }
      return {
        schema,
        schemaPath,
        topSchemaRef,
        errSchemaPath
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  subschema$1.getSubschema = getSubschema;
  function extendSubschemaData(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== void 0 && dataProp !== void 0) {
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== void 0) {
      const { errorPath, dataPathArr, opts } = it;
      const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
      dataContextProps(nextData);
      subschema2.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
      subschema2.parentDataProperty = (0, codegen_1._)`${dataProp}`;
      subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
    }
    if (data !== void 0) {
      const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
      dataContextProps(nextData);
      if (propertyName !== void 0)
        subschema2.propertyName = propertyName;
    }
    if (dataTypes)
      subschema2.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
      subschema2.data = _nextData;
      subschema2.dataLevel = it.dataLevel + 1;
      subschema2.dataTypes = [];
      it.definedProperties = /* @__PURE__ */ new Set();
      subschema2.parentData = it.data;
      subschema2.dataNames = [...it.dataNames, _nextData];
    }
  }
  subschema$1.extendSubschemaData = extendSubschemaData;
  function extendSubschemaMode(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== void 0)
      subschema2.compositeRule = compositeRule;
    if (createErrors !== void 0)
      subschema2.createErrors = createErrors;
    if (allErrors !== void 0)
      subschema2.allErrors = allErrors;
    subschema2.jtdDiscriminator = jtdDiscriminator;
    subschema2.jtdMetadata = jtdMetadata;
  }
  subschema$1.extendSubschemaMode = extendSubschemaMode;
  return subschema$1;
}
var resolve$1 = {};
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
  if (hasRequiredFastDeepEqual) return fastDeepEqual;
  hasRequiredFastDeepEqual = 1;
  fastDeepEqual = function equal2(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; )
          if (!equal2(a[i], b[i])) return false;
        return true;
      }
      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal2(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  return fastDeepEqual;
}
var jsonSchemaTraverse$1 = { exports: {} };
var hasRequiredJsonSchemaTraverse$1;
function requireJsonSchemaTraverse$1() {
  if (hasRequiredJsonSchemaTraverse$1) return jsonSchemaTraverse$1.exports;
  hasRequiredJsonSchemaTraverse$1 = 1;
  var traverse = jsonSchemaTraverse$1.exports = function(schema, opts, cb) {
    if (typeof opts == "function") {
      cb = opts;
      opts = {};
    }
    cb = opts.cb || cb;
    var pre = typeof cb == "function" ? cb : cb.pre || function() {
    };
    var post = cb.post || function() {
    };
    _traverse(opts, pre, post, schema, "", schema);
  };
  traverse.keywords = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true,
    if: true,
    then: true,
    else: true
  };
  traverse.arrayKeywords = {
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
  };
  traverse.propsKeywords = {
    $defs: true,
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true
  };
  traverse.skipKeywords = {
    default: true,
    enum: true,
    const: true,
    required: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    multipleOf: true,
    maxLength: true,
    minLength: true,
    pattern: true,
    format: true,
    maxItems: true,
    minItems: true,
    uniqueItems: true,
    maxProperties: true,
    minProperties: true
  };
  function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (schema && typeof schema == "object" && !Array.isArray(schema)) {
      pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      for (var key in schema) {
        var sch = schema[key];
        if (Array.isArray(sch)) {
          if (key in traverse.arrayKeywords) {
            for (var i = 0; i < sch.length; i++)
              _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
          }
        } else if (key in traverse.propsKeywords) {
          if (sch && typeof sch == "object") {
            for (var prop in sch)
              _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
          }
        } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
          _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
        }
      }
      post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    }
  }
  function escapeJsonPtr(str) {
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return jsonSchemaTraverse$1.exports;
}
var hasRequiredResolve$1;
function requireResolve$1() {
  if (hasRequiredResolve$1) return resolve$1;
  hasRequiredResolve$1 = 1;
  Object.defineProperty(resolve$1, "__esModule", { value: true });
  resolve$1.getSchemaRefs = resolve$1.resolveUrl = resolve$1.normalizeId = resolve$1._getFullPath = resolve$1.getFullPath = resolve$1.inlineRef = void 0;
  const util_1 = requireUtil$1();
  const equal2 = requireFastDeepEqual();
  const traverse = requireJsonSchemaTraverse$1();
  const SIMPLE_INLINED = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function inlineRef(schema, limit2 = true) {
    if (typeof schema == "boolean")
      return true;
    if (limit2 === true)
      return !hasRef(schema);
    if (!limit2)
      return false;
    return countKeys(schema) <= limit2;
  }
  resolve$1.inlineRef = inlineRef;
  const REF_KEYWORDS = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function hasRef(schema) {
    for (const key in schema) {
      if (REF_KEYWORDS.has(key))
        return true;
      const sch = schema[key];
      if (Array.isArray(sch) && sch.some(hasRef))
        return true;
      if (typeof sch == "object" && hasRef(sch))
        return true;
    }
    return false;
  }
  function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
      if (key === "$ref")
        return Infinity;
      count++;
      if (SIMPLE_INLINED.has(key))
        continue;
      if (typeof schema[key] == "object") {
        (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
      }
      if (count === Infinity)
        return Infinity;
    }
    return count;
  }
  function getFullPath(resolver, id2 = "", normalize) {
    if (normalize !== false)
      id2 = normalizeId(id2);
    const p = resolver.parse(id2);
    return _getFullPath(resolver, p);
  }
  resolve$1.getFullPath = getFullPath;
  function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
  }
  resolve$1._getFullPath = _getFullPath;
  const TRAILING_SLASH_HASH = /#\/?$/;
  function normalizeId(id2) {
    return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
  }
  resolve$1.normalizeId = normalizeId;
  function resolveUrl(resolver, baseId, id2) {
    id2 = normalizeId(id2);
    return resolver.resolve(baseId, id2);
  }
  resolve$1.resolveUrl = resolveUrl;
  const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
  function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
      return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = /* @__PURE__ */ new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
      if (parentJsonPtr === void 0)
        return;
      const fullPath = pathPrefix + jsonPtr;
      let innerBaseId = baseIds[parentJsonPtr];
      if (typeof sch[schemaId] == "string")
        innerBaseId = addRef.call(this, sch[schemaId]);
      addAnchor.call(this, sch.$anchor);
      addAnchor.call(this, sch.$dynamicAnchor);
      baseIds[jsonPtr] = innerBaseId;
      function addRef(ref2) {
        const _resolve = this.opts.uriResolver.resolve;
        ref2 = normalizeId(innerBaseId ? _resolve(innerBaseId, ref2) : ref2);
        if (schemaRefs.has(ref2))
          throw ambiguos(ref2);
        schemaRefs.add(ref2);
        let schOrRef = this.refs[ref2];
        if (typeof schOrRef == "string")
          schOrRef = this.refs[schOrRef];
        if (typeof schOrRef == "object") {
          checkAmbiguosRef(sch, schOrRef.schema, ref2);
        } else if (ref2 !== normalizeId(fullPath)) {
          if (ref2[0] === "#") {
            checkAmbiguosRef(sch, localRefs[ref2], ref2);
            localRefs[ref2] = sch;
          } else {
            this.refs[ref2] = fullPath;
          }
        }
        return ref2;
      }
      function addAnchor(anchor) {
        if (typeof anchor == "string") {
          if (!ANCHOR.test(anchor))
            throw new Error(`invalid anchor "${anchor}"`);
          addRef.call(this, `#${anchor}`);
        }
      }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref2) {
      if (sch2 !== void 0 && !equal2(sch1, sch2))
        throw ambiguos(ref2);
    }
    function ambiguos(ref2) {
      return new Error(`reference "${ref2}" resolves to more than one schema`);
    }
  }
  resolve$1.getSchemaRefs = getSchemaRefs;
  return resolve$1;
}
var hasRequiredValidate$1;
function requireValidate$1() {
  if (hasRequiredValidate$1) return validate$1;
  hasRequiredValidate$1 = 1;
  Object.defineProperty(validate$1, "__esModule", { value: true });
  validate$1.getData = validate$1.KeywordCxt = validate$1.validateFunctionCode = void 0;
  const boolSchema_1 = requireBoolSchema$1();
  const dataType_1 = requireDataType$1();
  const applicability_1 = requireApplicability$1();
  const dataType_2 = requireDataType$1();
  const defaults_1 = requireDefaults$1();
  const keyword_1 = requireKeyword$1();
  const subschema_1 = requireSubschema$1();
  const codegen_1 = requireCodegen$1();
  const names_1 = requireNames$1();
  const resolve_1 = requireResolve$1();
  const util_1 = requireUtil$1();
  const errors_1 = requireErrors$1();
  function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
      checkKeywords(it);
      if (schemaCxtHasRules(it)) {
        topSchemaObjCode(it);
        return;
      }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
  }
  validate$1.validateFunctionCode = validateFunctionCode;
  function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
      gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
        gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
        destructureValCxtES5(gen, opts);
        gen.code(body);
      });
    } else {
      gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
  }
  function destructureValCxt(opts) {
    return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
  }
  function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
      gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
      gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
      gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
      gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
      if (opts.dynamicRef)
        gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
      gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
      gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
      gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
      gen.var(names_1.default.rootData, names_1.default.data);
      if (opts.dynamicRef)
        gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
    });
  }
  function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      checkNoDefault(it);
      gen.let(names_1.default.vErrors, null);
      gen.let(names_1.default.errors, 0);
      if (opts.unevaluated)
        resetEvaluated(it);
      typeAndKeywords(it);
      returnResults(it);
    });
    return;
  }
  function resetEvaluated(it) {
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
    gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
    gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
  }
  function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
  }
  function subschemaCode(it, valid2) {
    if (isSchemaObj(it)) {
      checkKeywords(it);
      if (schemaCxtHasRules(it)) {
        subSchemaObjCode(it, valid2);
        return;
      }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid2);
  }
  function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (self.RULES.all[key])
        return true;
    return false;
  }
  function isSchemaObj(it) {
    return typeof it.schema != "boolean";
  }
  function subSchemaObjCode(it, valid2) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
      commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    gen.var(valid2, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
  }
  function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
  }
  function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
      return schemaKeywords(it, [], false, errsCount);
    const types2 = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types2);
    schemaKeywords(it, types2, !checkedTypes, errsCount);
  }
  function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
      self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
  }
  function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
      (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
  }
  function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
      it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
  }
  function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
      gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
    } else if (typeof opts.$comment == "function") {
      const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
      const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
      gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
  }
  function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
      gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
    } else {
      gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
      if (opts.unevaluated)
        assignEvaluated(it);
      gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
    }
  }
  function assignEvaluated({ gen, evaluated, props, items: items2 }) {
    if (props instanceof codegen_1.Name)
      gen.assign((0, codegen_1._)`${evaluated}.props`, props);
    if (items2 instanceof codegen_1.Name)
      gen.assign((0, codegen_1._)`${evaluated}.items`, items2);
  }
  function schemaKeywords(it, types2, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
      gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
      return;
    }
    if (!opts.jtd)
      checkStrictTypes(it, types2);
    gen.block(() => {
      for (const group of RULES.rules)
        groupKeywords(group);
      groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
      if (!(0, applicability_1.shouldUseGroup)(schema, group))
        return;
      if (group.type) {
        gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
        iterateKeywords(it, group);
        if (types2.length === 1 && types2[0] === group.type && typeErrors) {
          gen.else();
          (0, dataType_2.reportTypeError)(it);
        }
        gen.endIf();
      } else {
        iterateKeywords(it, group);
      }
      if (!allErrors)
        gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
    }
  }
  function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults } } = it;
    if (useDefaults)
      (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
      for (const rule of group.rules) {
        if ((0, applicability_1.shouldUseRule)(schema, rule)) {
          keywordCode(it, rule.keyword, rule.definition, group.type);
        }
      }
    });
  }
  function checkStrictTypes(it, types2) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
      return;
    checkContextTypes(it, types2);
    if (!it.opts.allowUnionTypes)
      checkMultipleTypes(it, types2);
    checkKeywordTypes(it, it.dataTypes);
  }
  function checkContextTypes(it, types2) {
    if (!types2.length)
      return;
    if (!it.dataTypes.length) {
      it.dataTypes = types2;
      return;
    }
    types2.forEach((t) => {
      if (!includesType(it.dataTypes, t)) {
        strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
      }
    });
    narrowSchemaTypes(it, types2);
  }
  function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
      strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
  }
  function checkKeywordTypes(it, ts) {
    const rules2 = it.self.RULES.all;
    for (const keyword2 in rules2) {
      const rule = rules2[keyword2];
      if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
        const { type: type2 } = rule.definition;
        if (type2.length && !type2.some((t) => hasApplicableType(ts, t))) {
          strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
        }
      }
    }
  }
  function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
  }
  function includesType(ts, t) {
    return ts.includes(t) || t === "integer" && ts.includes("number");
  }
  function narrowSchemaTypes(it, withTypes) {
    const ts = [];
    for (const t of it.dataTypes) {
      if (includesType(withTypes, t))
        ts.push(t);
      else if (withTypes.includes("integer") && t === "number")
        ts.push("integer");
    }
    it.dataTypes = ts;
  }
  function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
  }
  class KeywordCxt {
    constructor(it, def, keyword2) {
      (0, keyword_1.validateKeywordUsage)(it, def, keyword2);
      this.gen = it.gen;
      this.allErrors = it.allErrors;
      this.keyword = keyword2;
      this.data = it.data;
      this.schema = it.schema[keyword2];
      this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
      this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword2, this.$data);
      this.schemaType = def.schemaType;
      this.parentSchema = it.schema;
      this.params = {};
      this.it = it;
      this.def = def;
      if (this.$data) {
        this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
      } else {
        this.schemaCode = this.schemaValue;
        if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
          throw new Error(`${keyword2} value must be ${JSON.stringify(def.schemaType)}`);
        }
      }
      if ("code" in def ? def.trackErrors : def.errors !== false) {
        this.errsCount = it.gen.const("_errs", names_1.default.errors);
      }
    }
    result(condition, successAction, failAction) {
      this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
      this.gen.if(condition);
      if (failAction)
        failAction();
      else
        this.error();
      if (successAction) {
        this.gen.else();
        successAction();
        if (this.allErrors)
          this.gen.endIf();
      } else {
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
    }
    pass(condition, failAction) {
      this.failResult((0, codegen_1.not)(condition), void 0, failAction);
    }
    fail(condition) {
      if (condition === void 0) {
        this.error();
        if (!this.allErrors)
          this.gen.if(false);
        return;
      }
      this.gen.if(condition);
      this.error();
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
    fail$data(condition) {
      if (!this.$data)
        return this.fail(condition);
      const { schemaCode } = this;
      this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
      if (errorParams) {
        this.setParams(errorParams);
        this._error(append, errorPaths);
        this.setParams({});
        return;
      }
      this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
      (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
      (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
      if (!this.allErrors)
        this.gen.if(cond);
    }
    setParams(obj, assign) {
      if (assign)
        Object.assign(this.params, obj);
      else
        this.params = obj;
    }
    block$data(valid2, codeBlock, $dataValid = codegen_1.nil) {
      this.gen.block(() => {
        this.check$data(valid2, $dataValid);
        codeBlock();
      });
    }
    check$data(valid2 = codegen_1.nil, $dataValid = codegen_1.nil) {
      if (!this.$data)
        return;
      const { gen, schemaCode, schemaType, def } = this;
      gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
      if (valid2 !== codegen_1.nil)
        gen.assign(valid2, true);
      if (schemaType.length || def.validateSchema) {
        gen.elseIf(this.invalid$data());
        this.$dataError();
        if (valid2 !== codegen_1.nil)
          gen.assign(valid2, false);
      }
      gen.else();
    }
    invalid$data() {
      const { gen, schemaCode, schemaType, def, it } = this;
      return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
      function wrong$DataType() {
        if (schemaType.length) {
          if (!(schemaCode instanceof codegen_1.Name))
            throw new Error("ajv implementation error");
          const st = Array.isArray(schemaType) ? schemaType : [schemaType];
          return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
        }
        return codegen_1.nil;
      }
      function invalid$DataSchema() {
        if (def.validateSchema) {
          const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
          return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
        }
        return codegen_1.nil;
      }
    }
    subschema(appl, valid2) {
      const subschema2 = (0, subschema_1.getSubschema)(this.it, appl);
      (0, subschema_1.extendSubschemaData)(subschema2, this.it, appl);
      (0, subschema_1.extendSubschemaMode)(subschema2, appl);
      const nextContext = { ...this.it, ...subschema2, items: void 0, props: void 0 };
      subschemaCode(nextContext, valid2);
      return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
      const { it, gen } = this;
      if (!it.opts.unevaluated)
        return;
      if (it.props !== true && schemaCxt.props !== void 0) {
        it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
      }
      if (it.items !== true && schemaCxt.items !== void 0) {
        it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
      }
    }
    mergeValidEvaluated(schemaCxt, valid2) {
      const { it, gen } = this;
      if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
        gen.if(valid2, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
        return true;
      }
    }
  }
  validate$1.KeywordCxt = KeywordCxt;
  function keywordCode(it, keyword2, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword2);
    if ("code" in def) {
      def.code(cxt, ruleType);
    } else if (cxt.$data && def.validate) {
      (0, keyword_1.funcKeywordCode)(cxt, def);
    } else if ("macro" in def) {
      (0, keyword_1.macroKeywordCode)(cxt, def);
    } else if (def.compile || def.validate) {
      (0, keyword_1.funcKeywordCode)(cxt, def);
    }
  }
  const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
  const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
      return names_1.default.rootData;
    if ($data[0] === "/") {
      if (!JSON_POINTER.test($data))
        throw new Error(`Invalid JSON-pointer: ${$data}`);
      jsonPointer = $data;
      data = names_1.default.rootData;
    } else {
      const matches = RELATIVE_JSON_POINTER.exec($data);
      if (!matches)
        throw new Error(`Invalid JSON-pointer: ${$data}`);
      const up = +matches[1];
      jsonPointer = matches[2];
      if (jsonPointer === "#") {
        if (up >= dataLevel)
          throw new Error(errorMsg("property/index", up));
        return dataPathArr[dataLevel - up];
      }
      if (up > dataLevel)
        throw new Error(errorMsg("data", up));
      data = dataNames[dataLevel - up];
      if (!jsonPointer)
        return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
      if (segment) {
        data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
        expr = (0, codegen_1._)`${expr} && ${data}`;
      }
    }
    return expr;
    function errorMsg(pointerType, up) {
      return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
  }
  validate$1.getData = getData;
  return validate$1;
}
var validation_error$1 = {};
var hasRequiredValidation_error$1;
function requireValidation_error$1() {
  if (hasRequiredValidation_error$1) return validation_error$1;
  hasRequiredValidation_error$1 = 1;
  Object.defineProperty(validation_error$1, "__esModule", { value: true });
  class ValidationError extends Error {
    constructor(errors2) {
      super("validation failed");
      this.errors = errors2;
      this.ajv = this.validation = true;
    }
  }
  validation_error$1.default = ValidationError;
  return validation_error$1;
}
var ref_error$1 = {};
var hasRequiredRef_error$1;
function requireRef_error$1() {
  if (hasRequiredRef_error$1) return ref_error$1;
  hasRequiredRef_error$1 = 1;
  Object.defineProperty(ref_error$1, "__esModule", { value: true });
  const resolve_1 = requireResolve$1();
  class MissingRefError extends Error {
    constructor(resolver, baseId, ref2, msg) {
      super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
      this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref2);
      this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
  }
  ref_error$1.default = MissingRefError;
  return ref_error$1;
}
var compile$1 = {};
var hasRequiredCompile$1;
function requireCompile$1() {
  if (hasRequiredCompile$1) return compile$1;
  hasRequiredCompile$1 = 1;
  Object.defineProperty(compile$1, "__esModule", { value: true });
  compile$1.resolveSchema = compile$1.getCompilingSchema = compile$1.resolveRef = compile$1.compileSchema = compile$1.SchemaEnv = void 0;
  const codegen_1 = requireCodegen$1();
  const validation_error_1 = requireValidation_error$1();
  const names_1 = requireNames$1();
  const resolve_1 = requireResolve$1();
  const util_1 = requireUtil$1();
  const validate_1 = requireValidate$1();
  class SchemaEnv {
    constructor(env) {
      var _a;
      this.refs = {};
      this.dynamicAnchors = {};
      let schema;
      if (typeof env.schema == "object")
        schema = env.schema;
      this.schema = env.schema;
      this.schemaId = env.schemaId;
      this.root = env.root || this;
      this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
      this.schemaPath = env.schemaPath;
      this.localRefs = env.localRefs;
      this.meta = env.meta;
      this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
      this.refs = {};
    }
  }
  compile$1.SchemaEnv = SchemaEnv;
  function compileSchema(sch) {
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
      return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
      _ValidationError = gen.scopeValue("Error", {
        ref: validation_error_1.default,
        code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
      });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
      gen,
      allErrors: this.opts.allErrors,
      data: names_1.default.data,
      parentData: names_1.default.parentData,
      parentDataProperty: names_1.default.parentDataProperty,
      dataNames: [names_1.default.data],
      dataPathArr: [codegen_1.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
      validateName,
      ValidationError: _ValidationError,
      schema: sch.schema,
      schemaEnv: sch,
      rootId,
      baseId: sch.baseId || rootId,
      schemaPath: codegen_1.nil,
      errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, codegen_1._)`""`,
      opts: this.opts,
      self: this
    };
    let sourceCode;
    try {
      this._compilations.add(sch);
      (0, validate_1.validateFunctionCode)(schemaCxt);
      gen.optimize(this.opts.code.optimize);
      const validateCode = gen.toString();
      sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
      if (this.opts.code.process)
        sourceCode = this.opts.code.process(sourceCode, sch);
      const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
      const validate2 = makeValidate(this, this.scope.get());
      this.scope.value(validateName, { ref: validate2 });
      validate2.errors = null;
      validate2.schema = sch.schema;
      validate2.schemaEnv = sch;
      if (sch.$async)
        validate2.$async = true;
      if (this.opts.code.source === true) {
        validate2.source = { validateName, validateCode, scopeValues: gen._values };
      }
      if (this.opts.unevaluated) {
        const { props, items: items2 } = schemaCxt;
        validate2.evaluated = {
          props: props instanceof codegen_1.Name ? void 0 : props,
          items: items2 instanceof codegen_1.Name ? void 0 : items2,
          dynamicProps: props instanceof codegen_1.Name,
          dynamicItems: items2 instanceof codegen_1.Name
        };
        if (validate2.source)
          validate2.source.evaluated = (0, codegen_1.stringify)(validate2.evaluated);
      }
      sch.validate = validate2;
      return sch;
    } catch (e) {
      delete sch.validate;
      delete sch.validateName;
      if (sourceCode)
        this.logger.error("Error compiling schema, function code:", sourceCode);
      throw e;
    } finally {
      this._compilations.delete(sch);
    }
  }
  compile$1.compileSchema = compileSchema;
  function resolveRef(root, baseId, ref2) {
    var _a;
    ref2 = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref2);
    const schOrFunc = root.refs[ref2];
    if (schOrFunc)
      return schOrFunc;
    let _sch = resolve2.call(this, root, ref2);
    if (_sch === void 0) {
      const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
      const { schemaId } = this.opts;
      if (schema)
        _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === void 0)
      return;
    return root.refs[ref2] = inlineOrCompile.call(this, _sch);
  }
  compile$1.resolveRef = resolveRef;
  function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
      return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
  }
  function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
      if (sameSchemaEnv(sch, schEnv))
        return sch;
    }
  }
  compile$1.getCompilingSchema = getCompilingSchema;
  function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
  }
  function resolve2(root, ref2) {
    let sch;
    while (typeof (sch = this.refs[ref2]) == "string")
      ref2 = sch;
    return sch || this.schemas[ref2] || resolveSchema.call(this, root, ref2);
  }
  function resolveSchema(root, ref2) {
    const p = this.opts.uriResolver.parse(ref2);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
      return getJsonPointer.call(this, p, root);
    }
    const id2 = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id2] || this.schemas[id2];
    if (typeof schOrRef == "string") {
      const sch = resolveSchema.call(this, root, schOrRef);
      if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
        return;
      return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
      return;
    if (!schOrRef.validate)
      compileSchema.call(this, schOrRef);
    if (id2 === (0, resolve_1.normalizeId)(ref2)) {
      const { schema } = schOrRef;
      const { schemaId } = this.opts;
      const schId = schema[schemaId];
      if (schId)
        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
      return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
  }
  compile$1.resolveSchema = resolveSchema;
  const PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
      return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
      if (typeof schema === "boolean")
        return;
      const partSchema = schema[(0, util_1.unescapeFragment)(part)];
      if (partSchema === void 0)
        return;
      schema = partSchema;
      const schId = typeof schema === "object" && schema[this.opts.schemaId];
      if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
      }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
      const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
      env = resolveSchema.call(this, root, $ref);
    }
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
      return env;
    return void 0;
  }
  return compile$1;
}
const $id$3 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description$1 = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
const type$3 = "object";
const required$3 = ["$data"];
const properties$5 = { "$data": { "type": "string", "anyOf": [{ "format": "relative-json-pointer" }, { "format": "json-pointer" }] } };
const additionalProperties$3 = false;
const require$$9$1 = {
  $id: $id$3,
  description: description$1,
  type: type$3,
  required: required$3,
  properties: properties$5,
  additionalProperties: additionalProperties$3
};
var uri$1 = {};
var fastUri = { exports: {} };
var scopedChars;
var hasRequiredScopedChars;
function requireScopedChars() {
  if (hasRequiredScopedChars) return scopedChars;
  hasRequiredScopedChars = 1;
  const HEX = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  scopedChars = {
    HEX
  };
  return scopedChars;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const { HEX } = requireScopedChars();
  function normalizeIPv4(host) {
    if (findToken(host, ".") < 3) {
      return { host, isIPV4: false };
    }
    const matches = host.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [];
    const [address] = matches;
    if (address) {
      return { host: stripLeadingZeros(address, "."), isIPV4: true };
    } else {
      return { host, isIPV4: false };
    }
  }
  function stringArrayToHexStripped(input, keepZero = false) {
    let acc = "";
    let strip = true;
    for (const c of input) {
      if (HEX[c] === void 0) return void 0;
      if (c !== "0" && strip === true) strip = false;
      if (!strip) acc += c;
    }
    if (keepZero && acc.length === 0) acc = "0";
    return acc;
  }
  function getIPV6(input) {
    let tokenCount = 0;
    const output = { error: false, address: "", zone: "" };
    const address = [];
    const buffer = [];
    let isZone = false;
    let endipv6Encountered = false;
    let endIpv6 = false;
    function consume() {
      if (buffer.length) {
        if (isZone === false) {
          const hex = stringArrayToHexStripped(buffer);
          if (hex !== void 0) {
            address.push(hex);
          } else {
            output.error = true;
            return false;
          }
        }
        buffer.length = 0;
      }
      return true;
    }
    for (let i = 0; i < input.length; i++) {
      const cursor = input[i];
      if (cursor === "[" || cursor === "]") {
        continue;
      }
      if (cursor === ":") {
        if (endipv6Encountered === true) {
          endIpv6 = true;
        }
        if (!consume()) {
          break;
        }
        tokenCount++;
        address.push(":");
        if (tokenCount > 7) {
          output.error = true;
          break;
        }
        if (i - 1 >= 0 && input[i - 1] === ":") {
          endipv6Encountered = true;
        }
        continue;
      } else if (cursor === "%") {
        if (!consume()) {
          break;
        }
        isZone = true;
      } else {
        buffer.push(cursor);
        continue;
      }
    }
    if (buffer.length) {
      if (isZone) {
        output.zone = buffer.join("");
      } else if (endIpv6) {
        address.push(buffer.join(""));
      } else {
        address.push(stringArrayToHexStripped(buffer));
      }
    }
    output.address = address.join("");
    return output;
  }
  function normalizeIPv6(host, opts = {}) {
    if (findToken(host, ":") < 2) {
      return { host, isIPV6: false };
    }
    const ipv6 = getIPV6(host);
    if (!ipv6.error) {
      let newHost = ipv6.address;
      let escapedHost = ipv6.address;
      if (ipv6.zone) {
        newHost += "%" + ipv6.zone;
        escapedHost += "%25" + ipv6.zone;
      }
      return { host: newHost, escapedHost, isIPV6: true };
    } else {
      return { host, isIPV6: false };
    }
  }
  function stripLeadingZeros(str, token) {
    let out = "";
    let skip = true;
    const l = str.length;
    for (let i = 0; i < l; i++) {
      const c = str[i];
      if (c === "0" && skip) {
        if (i + 1 <= l && str[i + 1] === token || i + 1 === l) {
          out += c;
          skip = false;
        }
      } else {
        if (c === token) {
          skip = true;
        } else {
          skip = false;
        }
        out += c;
      }
    }
    return out;
  }
  function findToken(str, token) {
    let ind = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === token) ind++;
    }
    return ind;
  }
  const RDS1 = /^\.\.?\//u;
  const RDS2 = /^\/\.(?:\/|$)/u;
  const RDS3 = /^\/\.\.(?:\/|$)/u;
  const RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function removeDotSegments(input) {
    const output = [];
    while (input.length) {
      if (input.match(RDS1)) {
        input = input.replace(RDS1, "");
      } else if (input.match(RDS2)) {
        input = input.replace(RDS2, "/");
      } else if (input.match(RDS3)) {
        input = input.replace(RDS3, "/");
        output.pop();
      } else if (input === "." || input === "..") {
        input = "";
      } else {
        const im = input.match(RDS5);
        if (im) {
          const s = im[0];
          input = input.slice(s.length);
          output.push(s);
        } else {
          throw new Error("Unexpected dot segment condition");
        }
      }
    }
    return output.join("");
  }
  function normalizeComponentEncoding(components, esc) {
    const func = esc !== true ? escape : unescape;
    if (components.scheme !== void 0) {
      components.scheme = func(components.scheme);
    }
    if (components.userinfo !== void 0) {
      components.userinfo = func(components.userinfo);
    }
    if (components.host !== void 0) {
      components.host = func(components.host);
    }
    if (components.path !== void 0) {
      components.path = func(components.path);
    }
    if (components.query !== void 0) {
      components.query = func(components.query);
    }
    if (components.fragment !== void 0) {
      components.fragment = func(components.fragment);
    }
    return components;
  }
  function recomposeAuthority(components, options) {
    const uriTokens = [];
    if (components.userinfo !== void 0) {
      uriTokens.push(components.userinfo);
      uriTokens.push("@");
    }
    if (components.host !== void 0) {
      let host = unescape(components.host);
      const ipV4res = normalizeIPv4(host);
      if (ipV4res.isIPV4) {
        host = ipV4res.host;
      } else {
        const ipV6res = normalizeIPv6(ipV4res.host, { isIPV4: false });
        if (ipV6res.isIPV6 === true) {
          host = `[${ipV6res.escapedHost}]`;
        } else {
          host = components.host;
        }
      }
      uriTokens.push(host);
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
      uriTokens.push(":");
      uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : void 0;
  }
  utils = {
    recomposeAuthority,
    normalizeComponentEncoding,
    removeDotSegments,
    normalizeIPv4,
    normalizeIPv6,
    stringArrayToHexStripped
  };
  return utils;
}
var schemes;
var hasRequiredSchemes;
function requireSchemes() {
  if (hasRequiredSchemes) return schemes;
  hasRequiredSchemes = 1;
  const UUID_REG = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu;
  const URN_REG = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function isSecure(wsComponents) {
    return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
  }
  function httpParse(components) {
    if (!components.host) {
      components.error = components.error || "HTTP URIs must have a host.";
    }
    return components;
  }
  function httpSerialize(components) {
    const secure = String(components.scheme).toLowerCase() === "https";
    if (components.port === (secure ? 443 : 80) || components.port === "") {
      components.port = void 0;
    }
    if (!components.path) {
      components.path = "/";
    }
    return components;
  }
  function wsParse(wsComponents) {
    wsComponents.secure = isSecure(wsComponents);
    wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
    wsComponents.path = void 0;
    wsComponents.query = void 0;
    return wsComponents;
  }
  function wsSerialize(wsComponents) {
    if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
      wsComponents.port = void 0;
    }
    if (typeof wsComponents.secure === "boolean") {
      wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
      wsComponents.secure = void 0;
    }
    if (wsComponents.resourceName) {
      const [path2, query] = wsComponents.resourceName.split("?");
      wsComponents.path = path2 && path2 !== "/" ? path2 : void 0;
      wsComponents.query = query;
      wsComponents.resourceName = void 0;
    }
    wsComponents.fragment = void 0;
    return wsComponents;
  }
  function urnParse(urnComponents, options) {
    if (!urnComponents.path) {
      urnComponents.error = "URN can not be parsed";
      return urnComponents;
    }
    const matches = urnComponents.path.match(URN_REG);
    if (matches) {
      const scheme = options.scheme || urnComponents.scheme || "urn";
      urnComponents.nid = matches[1].toLowerCase();
      urnComponents.nss = matches[2];
      const urnScheme = `${scheme}:${options.nid || urnComponents.nid}`;
      const schemeHandler = SCHEMES[urnScheme];
      urnComponents.path = void 0;
      if (schemeHandler) {
        urnComponents = schemeHandler.parse(urnComponents, options);
      }
    } else {
      urnComponents.error = urnComponents.error || "URN can not be parsed.";
    }
    return urnComponents;
  }
  function urnSerialize(urnComponents, options) {
    const scheme = options.scheme || urnComponents.scheme || "urn";
    const nid = urnComponents.nid.toLowerCase();
    const urnScheme = `${scheme}:${options.nid || nid}`;
    const schemeHandler = SCHEMES[urnScheme];
    if (schemeHandler) {
      urnComponents = schemeHandler.serialize(urnComponents, options);
    }
    const uriComponents = urnComponents;
    const nss = urnComponents.nss;
    uriComponents.path = `${nid || options.nid}:${nss}`;
    options.skipEscape = true;
    return uriComponents;
  }
  function urnuuidParse(urnComponents, options) {
    const uuidComponents = urnComponents;
    uuidComponents.uuid = uuidComponents.nss;
    uuidComponents.nss = void 0;
    if (!options.tolerant && (!uuidComponents.uuid || !UUID_REG.test(uuidComponents.uuid))) {
      uuidComponents.error = uuidComponents.error || "UUID is not valid.";
    }
    return uuidComponents;
  }
  function urnuuidSerialize(uuidComponents) {
    const urnComponents = uuidComponents;
    urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
    return urnComponents;
  }
  const http = {
    scheme: "http",
    domainHost: true,
    parse: httpParse,
    serialize: httpSerialize
  };
  const https = {
    scheme: "https",
    domainHost: http.domainHost,
    parse: httpParse,
    serialize: httpSerialize
  };
  const ws = {
    scheme: "ws",
    domainHost: true,
    parse: wsParse,
    serialize: wsSerialize
  };
  const wss = {
    scheme: "wss",
    domainHost: ws.domainHost,
    parse: ws.parse,
    serialize: ws.serialize
  };
  const urn = {
    scheme: "urn",
    parse: urnParse,
    serialize: urnSerialize,
    skipNormalize: true
  };
  const urnuuid = {
    scheme: "urn:uuid",
    parse: urnuuidParse,
    serialize: urnuuidSerialize,
    skipNormalize: true
  };
  const SCHEMES = {
    http,
    https,
    ws,
    wss,
    urn,
    "urn:uuid": urnuuid
  };
  schemes = SCHEMES;
  return schemes;
}
var hasRequiredFastUri;
function requireFastUri() {
  if (hasRequiredFastUri) return fastUri.exports;
  hasRequiredFastUri = 1;
  const { normalizeIPv6, normalizeIPv4, removeDotSegments, recomposeAuthority, normalizeComponentEncoding } = requireUtils();
  const SCHEMES = requireSchemes();
  function normalize(uri2, options) {
    if (typeof uri2 === "string") {
      uri2 = serialize(parse(uri2, options), options);
    } else if (typeof uri2 === "object") {
      uri2 = parse(serialize(uri2, options), options);
    }
    return uri2;
  }
  function resolve2(baseURI, relativeURI, options) {
    const schemelessOptions = Object.assign({ scheme: "null" }, options);
    const resolved = resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true);
    return serialize(resolved, { ...schemelessOptions, skipEscape: true });
  }
  function resolveComponents(base, relative, options, skipNormalization) {
    const target = {};
    if (!skipNormalization) {
      base = parse(serialize(base, options), options);
      relative = parse(serialize(relative, options), options);
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
      target.scheme = relative.scheme;
      target.userinfo = relative.userinfo;
      target.host = relative.host;
      target.port = relative.port;
      target.path = removeDotSegments(relative.path || "");
      target.query = relative.query;
    } else {
      if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (!relative.path) {
          target.path = base.path;
          if (relative.query !== void 0) {
            target.query = relative.query;
          } else {
            target.query = base.query;
          }
        } else {
          if (relative.path.charAt(0) === "/") {
            target.path = removeDotSegments(relative.path);
          } else {
            if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
              target.path = "/" + relative.path;
            } else if (!base.path) {
              target.path = relative.path;
            } else {
              target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
            }
            target.path = removeDotSegments(target.path);
          }
          target.query = relative.query;
        }
        target.userinfo = base.userinfo;
        target.host = base.host;
        target.port = base.port;
      }
      target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
  }
  function equal2(uriA, uriB, options) {
    if (typeof uriA === "string") {
      uriA = unescape(uriA);
      uriA = serialize(normalizeComponentEncoding(parse(uriA, options), true), { ...options, skipEscape: true });
    } else if (typeof uriA === "object") {
      uriA = serialize(normalizeComponentEncoding(uriA, true), { ...options, skipEscape: true });
    }
    if (typeof uriB === "string") {
      uriB = unescape(uriB);
      uriB = serialize(normalizeComponentEncoding(parse(uriB, options), true), { ...options, skipEscape: true });
    } else if (typeof uriB === "object") {
      uriB = serialize(normalizeComponentEncoding(uriB, true), { ...options, skipEscape: true });
    }
    return uriA.toLowerCase() === uriB.toLowerCase();
  }
  function serialize(cmpts, opts) {
    const components = {
      host: cmpts.host,
      scheme: cmpts.scheme,
      userinfo: cmpts.userinfo,
      port: cmpts.port,
      path: cmpts.path,
      query: cmpts.query,
      nid: cmpts.nid,
      nss: cmpts.nss,
      uuid: cmpts.uuid,
      fragment: cmpts.fragment,
      reference: cmpts.reference,
      resourceName: cmpts.resourceName,
      secure: cmpts.secure,
      error: ""
    };
    const options = Object.assign({}, opts);
    const uriTokens = [];
    const schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.path !== void 0) {
      if (!options.skipEscape) {
        components.path = escape(components.path);
        if (components.scheme !== void 0) {
          components.path = components.path.split("%3A").join(":");
        }
      } else {
        components.path = unescape(components.path);
      }
    }
    if (options.reference !== "suffix" && components.scheme) {
      uriTokens.push(components.scheme, ":");
    }
    const authority = recomposeAuthority(components, options);
    if (authority !== void 0) {
      if (options.reference !== "suffix") {
        uriTokens.push("//");
      }
      uriTokens.push(authority);
      if (components.path && components.path.charAt(0) !== "/") {
        uriTokens.push("/");
      }
    }
    if (components.path !== void 0) {
      let s = components.path;
      if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
        s = removeDotSegments(s);
      }
      if (authority === void 0) {
        s = s.replace(/^\/\//u, "/%2F");
      }
      uriTokens.push(s);
    }
    if (components.query !== void 0) {
      uriTokens.push("?", components.query);
    }
    if (components.fragment !== void 0) {
      uriTokens.push("#", components.fragment);
    }
    return uriTokens.join("");
  }
  const hexLookUp = Array.from({ length: 127 }, (v, k) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(k)));
  function nonSimpleDomain(value) {
    let code2 = 0;
    for (let i = 0, len = value.length; i < len; ++i) {
      code2 = value.charCodeAt(i);
      if (code2 > 126 || hexLookUp[code2]) {
        return true;
      }
    }
    return false;
  }
  const URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function parse(uri2, opts) {
    const options = Object.assign({}, opts);
    const parsed = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    };
    const gotEncoding = uri2.indexOf("%") !== -1;
    let isIP = false;
    if (options.reference === "suffix") uri2 = (options.scheme ? options.scheme + ":" : "") + "//" + uri2;
    const matches = uri2.match(URI_PARSE);
    if (matches) {
      parsed.scheme = matches[1];
      parsed.userinfo = matches[3];
      parsed.host = matches[4];
      parsed.port = parseInt(matches[5], 10);
      parsed.path = matches[6] || "";
      parsed.query = matches[7];
      parsed.fragment = matches[8];
      if (isNaN(parsed.port)) {
        parsed.port = matches[5];
      }
      if (parsed.host) {
        const ipv4result = normalizeIPv4(parsed.host);
        if (ipv4result.isIPV4 === false) {
          const ipv6result = normalizeIPv6(ipv4result.host, { isIPV4: false });
          parsed.host = ipv6result.host.toLowerCase();
          isIP = ipv6result.isIPV6;
        } else {
          parsed.host = ipv4result.host;
          isIP = true;
        }
      }
      if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && !parsed.path && parsed.query === void 0) {
        parsed.reference = "same-document";
      } else if (parsed.scheme === void 0) {
        parsed.reference = "relative";
      } else if (parsed.fragment === void 0) {
        parsed.reference = "absolute";
      } else {
        parsed.reference = "uri";
      }
      if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
        parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
      }
      const schemeHandler = SCHEMES[(options.scheme || parsed.scheme || "").toLowerCase()];
      if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
        if (parsed.host && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
          try {
            parsed.host = URL.domainToASCII(parsed.host.toLowerCase());
          } catch (e) {
            parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
          }
        }
      }
      if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
        if (gotEncoding && parsed.scheme !== void 0) {
          parsed.scheme = unescape(parsed.scheme);
        }
        if (gotEncoding && parsed.host !== void 0) {
          parsed.host = unescape(parsed.host);
        }
        if (parsed.path !== void 0 && parsed.path.length) {
          parsed.path = escape(unescape(parsed.path));
        }
        if (parsed.fragment !== void 0 && parsed.fragment.length) {
          parsed.fragment = encodeURI(decodeURIComponent(parsed.fragment));
        }
      }
      if (schemeHandler && schemeHandler.parse) {
        schemeHandler.parse(parsed, options);
      }
    } else {
      parsed.error = parsed.error || "URI can not be parsed.";
    }
    return parsed;
  }
  const fastUri$1 = {
    SCHEMES,
    normalize,
    resolve: resolve2,
    resolveComponents,
    equal: equal2,
    serialize,
    parse
  };
  fastUri.exports = fastUri$1;
  fastUri.exports.default = fastUri$1;
  fastUri.exports.fastUri = fastUri$1;
  return fastUri.exports;
}
var hasRequiredUri$1;
function requireUri$1() {
  if (hasRequiredUri$1) return uri$1;
  hasRequiredUri$1 = 1;
  Object.defineProperty(uri$1, "__esModule", { value: true });
  const uri2 = requireFastUri();
  uri2.code = 'require("ajv/dist/runtime/uri").default';
  uri$1.default = uri2;
  return uri$1;
}
var hasRequiredCore$3;
function requireCore$3() {
  if (hasRequiredCore$3) return core$3;
  hasRequiredCore$3 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = requireValidate$1();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = requireCodegen$1();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    const validation_error_1 = requireValidation_error$1();
    const ref_error_1 = requireRef_error$1();
    const rules_1 = requireRules$1();
    const compile_1 = requireCompile$1();
    const codegen_2 = requireCodegen$1();
    const resolve_1 = requireResolve$1();
    const dataType_1 = requireDataType$1();
    const util_1 = requireUtil$1();
    const $dataRefSchema = require$$9$1;
    const uri_1 = requireUri$1();
    const defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    const EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    const removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    const deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    const MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    class Ajv {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid2 = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid2;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref2, missingRef }) {
          if (this.refs[ref2]) {
            throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref2) {
          const _schema = await _loadSchema.call(this, ref2);
          if (!this.refs[ref2])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref2])
            this.addSchema(_schema, ref2, meta);
        }
        async function _loadSchema(ref2) {
          const p = this._loading[ref2];
          if (p)
            return p;
          try {
            return await (this._loading[ref2] = loadSchema(ref2));
          } finally {
            delete this._loading[ref2];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id2;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id2 = schema[schemaId];
          if (id2 !== void 0 && typeof id2 != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id2);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema2;
        $schema2 = schema.$schema;
        if ($schema2 !== void 0 && typeof $schema2 != "string") {
          throw new Error("$schema must be a string");
        }
        $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema2) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid2 = this.validate($schema2, schema);
        if (!valid2 && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid2;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id2 = schemaKeyRef[this.opts.schemaId];
            if (id2) {
              id2 = (0, resolve_1.normalizeId)(id2);
              delete this.schemas[id2];
              delete this.refs[id2];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions2) {
        for (const def of definitions2)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword2;
        if (typeof kwdOrDef == "string") {
          keyword2 = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword2;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword2 = def.keyword;
          if (Array.isArray(keyword2) && !keyword2.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword2, def);
        if (!def) {
          (0, util_1.eachItem)(keyword2, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword2) {
        const rule = this.RULES.all[keyword2];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword2) {
        const { RULES } = this;
        delete RULES.keywords[keyword2];
        delete RULES.all[keyword2];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword2);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format2) {
        if (typeof format2 == "string")
          format2 = new RegExp(format2);
        this.formats[name] = format2;
        return this;
      }
      errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors2 || errors2.length === 0)
          return "No errors";
        return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules2 = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules2) {
            const rule = rules2[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id2;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id2 = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id2 || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id2) {
        if (this.schemas[id2] || this.refs[id2]) {
          throw new Error(`schema with key or id "${id2}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    }
    Ajv.ValidationError = validation_error_1.default;
    Ajv.MissingRefError = ref_error_1.default;
    exports.default = Ajv;
    function checkOptions(checkOpts, options, msg, log2 = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log2](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format2 = this.opts.formats[name];
        if (format2)
          this.addFormat(name, format2);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword2 in defs) {
        const def = defs[keyword2];
        if (!def.keyword)
          def.keyword = keyword2;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    const noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword2, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword2, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword2, definition, dataType2) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType2 && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType2);
      if (!ruleGroup) {
        ruleGroup = { type: dataType2, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword2] = true;
      if (!definition)
        return;
      const rule = {
        keyword: keyword2,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword2] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    const $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  })(core$3);
  return core$3;
}
var draft7$1 = {};
var core$2 = {};
var id$1 = {};
var hasRequiredId$1;
function requireId$1() {
  if (hasRequiredId$1) return id$1;
  hasRequiredId$1 = 1;
  Object.defineProperty(id$1, "__esModule", { value: true });
  const def = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  id$1.default = def;
  return id$1;
}
var ref$1 = {};
var hasRequiredRef$1;
function requireRef$1() {
  if (hasRequiredRef$1) return ref$1;
  hasRequiredRef$1 = 1;
  Object.defineProperty(ref$1, "__esModule", { value: true });
  ref$1.callRef = ref$1.getValidate = void 0;
  const ref_error_1 = requireRef_error$1();
  const code_1 = requireCode$2();
  const codegen_1 = requireCodegen$1();
  const names_1 = requireNames$1();
  const compile_1 = requireCompile$1();
  const util_1 = requireUtil$1();
  const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
      const { gen, schema: $ref, it } = cxt;
      const { baseId, schemaEnv: env, validateName, opts, self } = it;
      const { root } = env;
      if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
        return callRootRef();
      const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
      if (schOrEnv === void 0)
        throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
      if (schOrEnv instanceof compile_1.SchemaEnv)
        return callValidate(schOrEnv);
      return inlineRefSchema(schOrEnv);
      function callRootRef() {
        if (env === root)
          return callRef(cxt, validateName, env, env.$async);
        const rootName = gen.scopeValue("root", { ref: root });
        return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
      }
      function callValidate(sch) {
        const v = getValidate(cxt, sch);
        callRef(cxt, v, sch, sch.$async);
      }
      function inlineRefSchema(sch) {
        const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
        const valid2 = gen.name("valid");
        const schCxt = cxt.subschema({
          schema: sch,
          dataTypes: [],
          schemaPath: codegen_1.nil,
          topSchemaRef: schName,
          errSchemaPath: $ref
        }, valid2);
        cxt.mergeEvaluated(schCxt);
        cxt.ok(valid2);
      }
    }
  };
  function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
  }
  ref$1.getValidate = getValidate;
  function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
      callAsyncRef();
    else
      callSyncRef();
    function callAsyncRef() {
      if (!env.$async)
        throw new Error("async schema referenced by sync schema");
      const valid2 = gen.let("valid");
      gen.try(() => {
        gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
        addEvaluatedFrom(v);
        if (!allErrors)
          gen.assign(valid2, true);
      }, (e) => {
        gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
        addErrorsFrom(e);
        if (!allErrors)
          gen.assign(valid2, false);
      });
      cxt.ok(valid2);
    }
    function callSyncRef() {
      cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source2) {
      const errs = (0, codegen_1._)`${source2}.errors`;
      gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
      gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source2) {
      var _a;
      if (!it.opts.unevaluated)
        return;
      const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
      if (it.props !== true) {
        if (schEvaluated && !schEvaluated.dynamicProps) {
          if (schEvaluated.props !== void 0) {
            it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
          }
        } else {
          const props = gen.var("props", (0, codegen_1._)`${source2}.evaluated.props`);
          it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
        }
      }
      if (it.items !== true) {
        if (schEvaluated && !schEvaluated.dynamicItems) {
          if (schEvaluated.items !== void 0) {
            it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
          }
        } else {
          const items2 = gen.var("items", (0, codegen_1._)`${source2}.evaluated.items`);
          it.items = util_1.mergeEvaluated.items(gen, items2, it.items, codegen_1.Name);
        }
      }
    }
  }
  ref$1.callRef = callRef;
  ref$1.default = def;
  return ref$1;
}
var hasRequiredCore$2;
function requireCore$2() {
  if (hasRequiredCore$2) return core$2;
  hasRequiredCore$2 = 1;
  Object.defineProperty(core$2, "__esModule", { value: true });
  const id_1 = requireId$1();
  const ref_1 = requireRef$1();
  const core2 = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default
  ];
  core$2.default = core2;
  return core$2;
}
var validation$1 = {};
var limitNumber$1 = {};
var hasRequiredLimitNumber$1;
function requireLimitNumber$1() {
  if (hasRequiredLimitNumber$1) return limitNumber$1;
  hasRequiredLimitNumber$1 = 1;
  Object.defineProperty(limitNumber$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const ops = codegen_1.operators;
  const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
  };
  const error = {
    message: ({ keyword: keyword2, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword2].okStr} ${schemaCode}`,
    params: ({ keyword: keyword2, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
  };
  const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword2].fail} ${schemaCode} || isNaN(${data})`);
    }
  };
  limitNumber$1.default = def;
  return limitNumber$1;
}
var multipleOf$1 = {};
var hasRequiredMultipleOf$1;
function requireMultipleOf$1() {
  if (hasRequiredMultipleOf$1) return multipleOf$1;
  hasRequiredMultipleOf$1 = 1;
  Object.defineProperty(multipleOf$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const error = {
    message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
  };
  const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, schemaCode, it } = cxt;
      const prec = it.opts.multipleOfPrecision;
      const res = gen.let("res");
      const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
      cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    }
  };
  multipleOf$1.default = def;
  return multipleOf$1;
}
var limitLength$1 = {};
var ucs2length$1 = {};
var hasRequiredUcs2length$1;
function requireUcs2length$1() {
  if (hasRequiredUcs2length$1) return ucs2length$1;
  hasRequiredUcs2length$1 = 1;
  Object.defineProperty(ucs2length$1, "__esModule", { value: true });
  function ucs2length2(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 55296 && value <= 56319 && pos < len) {
        value = str.charCodeAt(pos);
        if ((value & 64512) === 56320)
          pos++;
      }
    }
    return length;
  }
  ucs2length$1.default = ucs2length2;
  ucs2length2.code = 'require("ajv/dist/runtime/ucs2length").default';
  return ucs2length$1;
}
var hasRequiredLimitLength$1;
function requireLimitLength$1() {
  if (hasRequiredLimitLength$1) return limitLength$1;
  hasRequiredLimitLength$1 = 1;
  Object.defineProperty(limitLength$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const ucs2length_1 = requireUcs2length$1();
  const error = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxLength" ? "more" : "fewer";
      return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
  };
  const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode, it } = cxt;
      const op = keyword2 === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
      const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
      cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
    }
  };
  limitLength$1.default = def;
  return limitLength$1;
}
var pattern$1 = {};
var hasRequiredPattern$1;
function requirePattern$1() {
  if (hasRequiredPattern$1) return pattern$1;
  hasRequiredPattern$1 = 1;
  Object.defineProperty(pattern$1, "__esModule", { value: true });
  const code_1 = requireCode$2();
  const codegen_1 = requireCodegen$1();
  const error = {
    message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
  };
  const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
      const { data, $data, schema, schemaCode, it } = cxt;
      const u = it.opts.unicodeRegExp ? "u" : "";
      const regExp = $data ? (0, codegen_1._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
      cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
    }
  };
  pattern$1.default = def;
  return pattern$1;
}
var limitProperties$1 = {};
var hasRequiredLimitProperties$1;
function requireLimitProperties$1() {
  if (hasRequiredLimitProperties$1) return limitProperties$1;
  hasRequiredLimitProperties$1 = 1;
  Object.defineProperty(limitProperties$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const error = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxProperties" ? "more" : "fewer";
      return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
  };
  const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      const op = keyword2 === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
      cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
    }
  };
  limitProperties$1.default = def;
  return limitProperties$1;
}
var required$2 = {};
var hasRequiredRequired$1;
function requireRequired$1() {
  if (hasRequiredRequired$1) return required$2;
  hasRequiredRequired$1 = 1;
  Object.defineProperty(required$2, "__esModule", { value: true });
  const code_1 = requireCode$2();
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
  };
  const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
      const { gen, schema, schemaCode, data, $data, it } = cxt;
      const { opts } = it;
      if (!$data && schema.length === 0)
        return;
      const useLoop = schema.length >= opts.loopRequired;
      if (it.allErrors)
        allErrorsMode();
      else
        exitOnErrorMode();
      if (opts.strictRequired) {
        const props = cxt.parentSchema.properties;
        const { definedProperties } = cxt.it;
        for (const requiredKey of schema) {
          if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
            const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
            const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
            (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
          }
        }
      }
      function allErrorsMode() {
        if (useLoop || $data) {
          cxt.block$data(codegen_1.nil, loopAllRequired);
        } else {
          for (const prop of schema) {
            (0, code_1.checkReportMissingProp)(cxt, prop);
          }
        }
      }
      function exitOnErrorMode() {
        const missing = gen.let("missing");
        if (useLoop || $data) {
          const valid2 = gen.let("valid", true);
          cxt.block$data(valid2, () => loopUntilMissing(missing, valid2));
          cxt.ok(valid2);
        } else {
          gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
      function loopAllRequired() {
        gen.forOf("prop", schemaCode, (prop) => {
          cxt.setParams({ missingProperty: prop });
          gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
        });
      }
      function loopUntilMissing(missing, valid2) {
        cxt.setParams({ missingProperty: missing });
        gen.forOf(missing, schemaCode, () => {
          gen.assign(valid2, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
          gen.if((0, codegen_1.not)(valid2), () => {
            cxt.error();
            gen.break();
          });
        }, codegen_1.nil);
      }
    }
  };
  required$2.default = def;
  return required$2;
}
var limitItems$1 = {};
var hasRequiredLimitItems$1;
function requireLimitItems$1() {
  if (hasRequiredLimitItems$1) return limitItems$1;
  hasRequiredLimitItems$1 = 1;
  Object.defineProperty(limitItems$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const error = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxItems" ? "more" : "fewer";
      return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
  };
  const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      const op = keyword2 === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
      cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
    }
  };
  limitItems$1.default = def;
  return limitItems$1;
}
var uniqueItems$1 = {};
var equal$1 = {};
var hasRequiredEqual$1;
function requireEqual$1() {
  if (hasRequiredEqual$1) return equal$1;
  hasRequiredEqual$1 = 1;
  Object.defineProperty(equal$1, "__esModule", { value: true });
  const equal2 = requireFastDeepEqual();
  equal2.code = 'require("ajv/dist/runtime/equal").default';
  equal$1.default = equal2;
  return equal$1;
}
var hasRequiredUniqueItems$1;
function requireUniqueItems$1() {
  if (hasRequiredUniqueItems$1) return uniqueItems$1;
  hasRequiredUniqueItems$1 = 1;
  Object.defineProperty(uniqueItems$1, "__esModule", { value: true });
  const dataType_1 = requireDataType$1();
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const equal_1 = requireEqual$1();
  const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
  };
  const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
      if (!$data && !schema)
        return;
      const valid2 = gen.let("valid");
      const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
      cxt.block$data(valid2, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
      cxt.ok(valid2);
      function validateUniqueItems() {
        const i = gen.let("i", (0, codegen_1._)`${data}.length`);
        const j = gen.let("j");
        cxt.setParams({ i, j });
        gen.assign(valid2, true);
        gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
      }
      function canOptimize() {
        return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
      }
      function loopN(i, j) {
        const item = gen.name("item");
        const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
        const indices = gen.const("indices", (0, codegen_1._)`{}`);
        gen.for((0, codegen_1._)`;${i}--;`, () => {
          gen.let(item, (0, codegen_1._)`${data}[${i}]`);
          gen.if(wrongType, (0, codegen_1._)`continue`);
          if (itemTypes.length > 1)
            gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
          gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
            gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
            cxt.error();
            gen.assign(valid2, false).break();
          }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
        });
      }
      function loopN2(i, j) {
        const eql = (0, util_1.useFunc)(gen, equal_1.default);
        const outer = gen.name("outer");
        gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
          cxt.error();
          gen.assign(valid2, false).break(outer);
        })));
      }
    }
  };
  uniqueItems$1.default = def;
  return uniqueItems$1;
}
var _const$1 = {};
var hasRequired_const$1;
function require_const$1() {
  if (hasRequired_const$1) return _const$1;
  hasRequired_const$1 = 1;
  Object.defineProperty(_const$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const equal_1 = requireEqual$1();
  const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
  };
  const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, $data, schemaCode, schema } = cxt;
      if ($data || schema && typeof schema == "object") {
        cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
      } else {
        cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
      }
    }
  };
  _const$1.default = def;
  return _const$1;
}
var _enum$1 = {};
var hasRequired_enum$1;
function require_enum$1() {
  if (hasRequired_enum$1) return _enum$1;
  hasRequired_enum$1 = 1;
  Object.defineProperty(_enum$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const equal_1 = requireEqual$1();
  const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
  };
  const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, $data, schema, schemaCode, it } = cxt;
      if (!$data && schema.length === 0)
        throw new Error("enum must have non-empty array");
      const useLoop = schema.length >= it.opts.loopEnum;
      let eql;
      const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
      let valid2;
      if (useLoop || $data) {
        valid2 = gen.let("valid");
        cxt.block$data(valid2, loopEnum);
      } else {
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const vSchema = gen.const("vSchema", schemaCode);
        valid2 = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
      }
      cxt.pass(valid2);
      function loopEnum() {
        gen.assign(valid2, false);
        gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid2, true).break()));
      }
      function equalCode(vSchema, i) {
        const sch = schema[i];
        return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
      }
    }
  };
  _enum$1.default = def;
  return _enum$1;
}
var hasRequiredValidation$1;
function requireValidation$1() {
  if (hasRequiredValidation$1) return validation$1;
  hasRequiredValidation$1 = 1;
  Object.defineProperty(validation$1, "__esModule", { value: true });
  const limitNumber_1 = requireLimitNumber$1();
  const multipleOf_1 = requireMultipleOf$1();
  const limitLength_1 = requireLimitLength$1();
  const pattern_1 = requirePattern$1();
  const limitProperties_1 = requireLimitProperties$1();
  const required_1 = requireRequired$1();
  const limitItems_1 = requireLimitItems$1();
  const uniqueItems_1 = requireUniqueItems$1();
  const const_1 = require_const$1();
  const enum_1 = require_enum$1();
  const validation2 = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default
  ];
  validation$1.default = validation2;
  return validation$1;
}
var applicator$1 = {};
var additionalItems$1 = {};
var hasRequiredAdditionalItems$1;
function requireAdditionalItems$1() {
  if (hasRequiredAdditionalItems$1) return additionalItems$1;
  hasRequiredAdditionalItems$1 = 1;
  Object.defineProperty(additionalItems$1, "__esModule", { value: true });
  additionalItems$1.validateAdditionalItems = void 0;
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const error = {
    message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
  };
  const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
      const { parentSchema, it } = cxt;
      const { items: items2 } = parentSchema;
      if (!Array.isArray(items2)) {
        (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      validateAdditionalItems(cxt, items2);
    }
  };
  function validateAdditionalItems(cxt, items2) {
    const { gen, schema, data, keyword: keyword2, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._)`${data}.length`);
    if (schema === false) {
      cxt.setParams({ len: items2.length });
      cxt.pass((0, codegen_1._)`${len} <= ${items2.length}`);
    } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
      const valid2 = gen.var("valid", (0, codegen_1._)`${len} <= ${items2.length}`);
      gen.if((0, codegen_1.not)(valid2), () => validateItems(valid2));
      cxt.ok(valid2);
    }
    function validateItems(valid2) {
      gen.forRange("i", items2.length, len, (i) => {
        cxt.subschema({ keyword: keyword2, dataProp: i, dataPropType: util_1.Type.Num }, valid2);
        if (!it.allErrors)
          gen.if((0, codegen_1.not)(valid2), () => gen.break());
      });
    }
  }
  additionalItems$1.validateAdditionalItems = validateAdditionalItems;
  additionalItems$1.default = def;
  return additionalItems$1;
}
var prefixItems$1 = {};
var items$1 = {};
var hasRequiredItems$1;
function requireItems$1() {
  if (hasRequiredItems$1) return items$1;
  hasRequiredItems$1 = 1;
  Object.defineProperty(items$1, "__esModule", { value: true });
  items$1.validateTuple = void 0;
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const code_1 = requireCode$2();
  const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
      const { schema, it } = cxt;
      if (Array.isArray(schema))
        return validateTuple(cxt, "additionalItems", schema);
      it.items = true;
      if ((0, util_1.alwaysValidSchema)(it, schema))
        return;
      cxt.ok((0, code_1.validateArray)(cxt));
    }
  };
  function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
      it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid2 = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._)`${data}.length`);
    schArr.forEach((sch, i) => {
      if ((0, util_1.alwaysValidSchema)(it, sch))
        return;
      gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
        keyword: keyword2,
        schemaProp: i,
        dataProp: i
      }, valid2));
      cxt.ok(valid2);
    });
    function checkStrictTuple(sch) {
      const { opts, errSchemaPath } = it;
      const l = schArr.length;
      const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
      if (opts.strictTuples && !fullTuple) {
        const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
        (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
      }
    }
  }
  items$1.validateTuple = validateTuple;
  items$1.default = def;
  return items$1;
}
var hasRequiredPrefixItems$1;
function requirePrefixItems$1() {
  if (hasRequiredPrefixItems$1) return prefixItems$1;
  hasRequiredPrefixItems$1 = 1;
  Object.defineProperty(prefixItems$1, "__esModule", { value: true });
  const items_1 = requireItems$1();
  const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
  };
  prefixItems$1.default = def;
  return prefixItems$1;
}
var items2020$1 = {};
var hasRequiredItems2020$1;
function requireItems2020$1() {
  if (hasRequiredItems2020$1) return items2020$1;
  hasRequiredItems2020$1 = 1;
  Object.defineProperty(items2020$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const code_1 = requireCode$2();
  const additionalItems_1 = requireAdditionalItems$1();
  const error = {
    message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
  };
  const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
      const { schema, parentSchema, it } = cxt;
      const { prefixItems: prefixItems2 } = parentSchema;
      it.items = true;
      if ((0, util_1.alwaysValidSchema)(it, schema))
        return;
      if (prefixItems2)
        (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems2);
      else
        cxt.ok((0, code_1.validateArray)(cxt));
    }
  };
  items2020$1.default = def;
  return items2020$1;
}
var contains$1 = {};
var hasRequiredContains$1;
function requireContains$1() {
  if (hasRequiredContains$1) return contains$1;
  hasRequiredContains$1 = 1;
  Object.defineProperty(contains$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const error = {
    message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
  };
  const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, schema, parentSchema, data, it } = cxt;
      let min;
      let max;
      const { minContains, maxContains } = parentSchema;
      if (it.opts.next) {
        min = minContains === void 0 ? 1 : minContains;
        max = maxContains;
      } else {
        min = 1;
      }
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      cxt.setParams({ min, max });
      if (max === void 0 && min === 0) {
        (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
        return;
      }
      if (max !== void 0 && min > max) {
        (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
        cxt.fail();
        return;
      }
      if ((0, util_1.alwaysValidSchema)(it, schema)) {
        let cond = (0, codegen_1._)`${len} >= ${min}`;
        if (max !== void 0)
          cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
        cxt.pass(cond);
        return;
      }
      it.items = true;
      const valid2 = gen.name("valid");
      if (max === void 0 && min === 1) {
        validateItems(valid2, () => gen.if(valid2, () => gen.break()));
      } else if (min === 0) {
        gen.let(valid2, true);
        if (max !== void 0)
          gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
      } else {
        gen.let(valid2, false);
        validateItemsWithCount();
      }
      cxt.result(valid2, () => cxt.reset());
      function validateItemsWithCount() {
        const schValid = gen.name("_valid");
        const count = gen.let("count", 0);
        validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
      }
      function validateItems(_valid, block) {
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword: "contains",
            dataProp: i,
            dataPropType: util_1.Type.Num,
            compositeRule: true
          }, _valid);
          block();
        });
      }
      function checkLimits(count) {
        gen.code((0, codegen_1._)`${count}++`);
        if (max === void 0) {
          gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid2, true).break());
        } else {
          gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid2, false).break());
          if (min === 1)
            gen.assign(valid2, true);
          else
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid2, true));
        }
      }
    }
  };
  contains$1.default = def;
  return contains$1;
}
var dependencies$1 = {};
var hasRequiredDependencies$1;
function requireDependencies$1() {
  if (hasRequiredDependencies$1) return dependencies$1;
  hasRequiredDependencies$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    const codegen_1 = requireCodegen$1();
    const util_1 = requireUtil$1();
    const code_1 = requireCode$2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    const def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword: keyword2, it } = cxt;
      const valid2 = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid2);
            cxt.mergeValidEvaluated(schCxt, valid2);
          },
          () => gen.var(valid2, true)
          // TODO var
        );
        cxt.ok(valid2);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  })(dependencies$1);
  return dependencies$1;
}
var propertyNames$1 = {};
var hasRequiredPropertyNames$1;
function requirePropertyNames$1() {
  if (hasRequiredPropertyNames$1) return propertyNames$1;
  hasRequiredPropertyNames$1 = 1;
  Object.defineProperty(propertyNames$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
  };
  const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
      const { gen, schema, data, it } = cxt;
      if ((0, util_1.alwaysValidSchema)(it, schema))
        return;
      const valid2 = gen.name("valid");
      gen.forIn("key", data, (key) => {
        cxt.setParams({ propertyName: key });
        cxt.subschema({
          keyword: "propertyNames",
          data: key,
          dataTypes: ["string"],
          propertyName: key,
          compositeRule: true
        }, valid2);
        gen.if((0, codegen_1.not)(valid2), () => {
          cxt.error(true);
          if (!it.allErrors)
            gen.break();
        });
      });
      cxt.ok(valid2);
    }
  };
  propertyNames$1.default = def;
  return propertyNames$1;
}
var additionalProperties$2 = {};
var hasRequiredAdditionalProperties$1;
function requireAdditionalProperties$1() {
  if (hasRequiredAdditionalProperties$1) return additionalProperties$2;
  hasRequiredAdditionalProperties$1 = 1;
  Object.defineProperty(additionalProperties$2, "__esModule", { value: true });
  const code_1 = requireCode$2();
  const codegen_1 = requireCodegen$1();
  const names_1 = requireNames$1();
  const util_1 = requireUtil$1();
  const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
  };
  const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, schema, parentSchema, data, errsCount, it } = cxt;
      if (!errsCount)
        throw new Error("ajv implementation error");
      const { allErrors, opts } = it;
      it.props = true;
      if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
        return;
      const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
      const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
      checkAdditionalProperties();
      cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
      function checkAdditionalProperties() {
        gen.forIn("key", data, (key) => {
          if (!props.length && !patProps.length)
            additionalPropertyCode(key);
          else
            gen.if(isAdditional(key), () => additionalPropertyCode(key));
        });
      }
      function isAdditional(key) {
        let definedProp;
        if (props.length > 8) {
          const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
          definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
        } else if (props.length) {
          definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
        } else {
          definedProp = codegen_1.nil;
        }
        if (patProps.length) {
          definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
        }
        return (0, codegen_1.not)(definedProp);
      }
      function deleteAdditional(key) {
        gen.code((0, codegen_1._)`delete ${data}[${key}]`);
      }
      function additionalPropertyCode(key) {
        if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
          deleteAdditional(key);
          return;
        }
        if (schema === false) {
          cxt.setParams({ additionalProperty: key });
          cxt.error();
          if (!allErrors)
            gen.break();
          return;
        }
        if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
          const valid2 = gen.name("valid");
          if (opts.removeAdditional === "failing") {
            applyAdditionalSchema(key, valid2, false);
            gen.if((0, codegen_1.not)(valid2), () => {
              cxt.reset();
              deleteAdditional(key);
            });
          } else {
            applyAdditionalSchema(key, valid2);
            if (!allErrors)
              gen.if((0, codegen_1.not)(valid2), () => gen.break());
          }
        }
      }
      function applyAdditionalSchema(key, valid2, errors2) {
        const subschema2 = {
          keyword: "additionalProperties",
          dataProp: key,
          dataPropType: util_1.Type.Str
        };
        if (errors2 === false) {
          Object.assign(subschema2, {
            compositeRule: true,
            createErrors: false,
            allErrors: false
          });
        }
        cxt.subschema(subschema2, valid2);
      }
    }
  };
  additionalProperties$2.default = def;
  return additionalProperties$2;
}
var properties$4 = {};
var hasRequiredProperties$1;
function requireProperties$1() {
  if (hasRequiredProperties$1) return properties$4;
  hasRequiredProperties$1 = 1;
  Object.defineProperty(properties$4, "__esModule", { value: true });
  const validate_1 = requireValidate$1();
  const code_1 = requireCode$2();
  const util_1 = requireUtil$1();
  const additionalProperties_1 = requireAdditionalProperties$1();
  const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
      const { gen, schema, parentSchema, data, it } = cxt;
      if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
        additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
      }
      const allProps = (0, code_1.allSchemaProperties)(schema);
      for (const prop of allProps) {
        it.definedProperties.add(prop);
      }
      if (it.opts.unevaluated && allProps.length && it.props !== true) {
        it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
      }
      const properties2 = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
      if (properties2.length === 0)
        return;
      const valid2 = gen.name("valid");
      for (const prop of properties2) {
        if (hasDefault(prop)) {
          applyPropertySchema(prop);
        } else {
          gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
          applyPropertySchema(prop);
          if (!it.allErrors)
            gen.else().var(valid2, true);
          gen.endIf();
        }
        cxt.it.definedProperties.add(prop);
        cxt.ok(valid2);
      }
      function hasDefault(prop) {
        return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
      }
      function applyPropertySchema(prop) {
        cxt.subschema({
          keyword: "properties",
          schemaProp: prop,
          dataProp: prop
        }, valid2);
      }
    }
  };
  properties$4.default = def;
  return properties$4;
}
var patternProperties$1 = {};
var hasRequiredPatternProperties$1;
function requirePatternProperties$1() {
  if (hasRequiredPatternProperties$1) return patternProperties$1;
  hasRequiredPatternProperties$1 = 1;
  Object.defineProperty(patternProperties$1, "__esModule", { value: true });
  const code_1 = requireCode$2();
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const util_2 = requireUtil$1();
  const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
      const { gen, schema, data, parentSchema, it } = cxt;
      const { opts } = it;
      const patterns = (0, code_1.allSchemaProperties)(schema);
      const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
      if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
        return;
      }
      const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
      const valid2 = gen.name("valid");
      if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
        it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
      }
      const { props } = it;
      validatePatternProperties();
      function validatePatternProperties() {
        for (const pat of patterns) {
          if (checkProperties)
            checkMatchingProperties(pat);
          if (it.allErrors) {
            validateProperties(pat);
          } else {
            gen.var(valid2, true);
            validateProperties(pat);
            gen.if(valid2);
          }
        }
      }
      function checkMatchingProperties(pat) {
        for (const prop in checkProperties) {
          if (new RegExp(pat).test(prop)) {
            (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
          }
        }
      }
      function validateProperties(pat) {
        gen.forIn("key", data, (key) => {
          gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
            const alwaysValid = alwaysValidPatterns.includes(pat);
            if (!alwaysValid) {
              cxt.subschema({
                keyword: "patternProperties",
                schemaProp: pat,
                dataProp: key,
                dataPropType: util_2.Type.Str
              }, valid2);
            }
            if (it.opts.unevaluated && props !== true) {
              gen.assign((0, codegen_1._)`${props}[${key}]`, true);
            } else if (!alwaysValid && !it.allErrors) {
              gen.if((0, codegen_1.not)(valid2), () => gen.break());
            }
          });
        });
      }
    }
  };
  patternProperties$1.default = def;
  return patternProperties$1;
}
var not$1 = {};
var hasRequiredNot$1;
function requireNot$1() {
  if (hasRequiredNot$1) return not$1;
  hasRequiredNot$1 = 1;
  Object.defineProperty(not$1, "__esModule", { value: true });
  const util_1 = requireUtil$1();
  const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
      const { gen, schema, it } = cxt;
      if ((0, util_1.alwaysValidSchema)(it, schema)) {
        cxt.fail();
        return;
      }
      const valid2 = gen.name("valid");
      cxt.subschema({
        keyword: "not",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, valid2);
      cxt.failResult(valid2, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" }
  };
  not$1.default = def;
  return not$1;
}
var anyOf$1 = {};
var hasRequiredAnyOf$1;
function requireAnyOf$1() {
  if (hasRequiredAnyOf$1) return anyOf$1;
  hasRequiredAnyOf$1 = 1;
  Object.defineProperty(anyOf$1, "__esModule", { value: true });
  const code_1 = requireCode$2();
  const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  anyOf$1.default = def;
  return anyOf$1;
}
var oneOf$1 = {};
var hasRequiredOneOf$1;
function requireOneOf$1() {
  if (hasRequiredOneOf$1) return oneOf$1;
  hasRequiredOneOf$1 = 1;
  Object.defineProperty(oneOf$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
  };
  const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, schema, parentSchema, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      if (it.opts.discriminator && parentSchema.discriminator)
        return;
      const schArr = schema;
      const valid2 = gen.let("valid", false);
      const passing = gen.let("passing", null);
      const schValid = gen.name("_valid");
      cxt.setParams({ passing });
      gen.block(validateOneOf);
      cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
      function validateOneOf() {
        schArr.forEach((sch, i) => {
          let schCxt;
          if ((0, util_1.alwaysValidSchema)(it, sch)) {
            gen.var(schValid, true);
          } else {
            schCxt = cxt.subschema({
              keyword: "oneOf",
              schemaProp: i,
              compositeRule: true
            }, schValid);
          }
          if (i > 0) {
            gen.if((0, codegen_1._)`${schValid} && ${valid2}`).assign(valid2, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
          }
          gen.if(schValid, () => {
            gen.assign(valid2, true);
            gen.assign(passing, i);
            if (schCxt)
              cxt.mergeEvaluated(schCxt, codegen_1.Name);
          });
        });
      }
    }
  };
  oneOf$1.default = def;
  return oneOf$1;
}
var allOf$1 = {};
var hasRequiredAllOf$1;
function requireAllOf$1() {
  if (hasRequiredAllOf$1) return allOf$1;
  hasRequiredAllOf$1 = 1;
  Object.defineProperty(allOf$1, "__esModule", { value: true });
  const util_1 = requireUtil$1();
  const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
      const { gen, schema, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const valid2 = gen.name("valid");
      schema.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid2);
        cxt.ok(valid2);
        cxt.mergeEvaluated(schCxt);
      });
    }
  };
  allOf$1.default = def;
  return allOf$1;
}
var _if$1 = {};
var hasRequired_if$1;
function require_if$1() {
  if (hasRequired_if$1) return _if$1;
  hasRequired_if$1 = 1;
  Object.defineProperty(_if$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const util_1 = requireUtil$1();
  const error = {
    message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
  };
  const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, parentSchema, it } = cxt;
      if (parentSchema.then === void 0 && parentSchema.else === void 0) {
        (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
      }
      const hasThen = hasSchema(it, "then");
      const hasElse = hasSchema(it, "else");
      if (!hasThen && !hasElse)
        return;
      const valid2 = gen.let("valid", true);
      const schValid = gen.name("_valid");
      validateIf();
      cxt.reset();
      if (hasThen && hasElse) {
        const ifClause = gen.let("ifClause");
        cxt.setParams({ ifClause });
        gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
      } else if (hasThen) {
        gen.if(schValid, validateClause("then"));
      } else {
        gen.if((0, codegen_1.not)(schValid), validateClause("else"));
      }
      cxt.pass(valid2, () => cxt.error(true));
      function validateIf() {
        const schCxt = cxt.subschema({
          keyword: "if",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, schValid);
        cxt.mergeEvaluated(schCxt);
      }
      function validateClause(keyword2, ifClause) {
        return () => {
          const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
          gen.assign(valid2, schValid);
          cxt.mergeValidEvaluated(schCxt, valid2);
          if (ifClause)
            gen.assign(ifClause, (0, codegen_1._)`${keyword2}`);
          else
            cxt.setParams({ ifClause: keyword2 });
        };
      }
    }
  };
  function hasSchema(it, keyword2) {
    const schema = it.schema[keyword2];
    return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
  }
  _if$1.default = def;
  return _if$1;
}
var thenElse$1 = {};
var hasRequiredThenElse$1;
function requireThenElse$1() {
  if (hasRequiredThenElse$1) return thenElse$1;
  hasRequiredThenElse$1 = 1;
  Object.defineProperty(thenElse$1, "__esModule", { value: true });
  const util_1 = requireUtil$1();
  const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: keyword2, parentSchema, it }) {
      if (parentSchema.if === void 0)
        (0, util_1.checkStrictMode)(it, `"${keyword2}" without "if" is ignored`);
    }
  };
  thenElse$1.default = def;
  return thenElse$1;
}
var hasRequiredApplicator$1;
function requireApplicator$1() {
  if (hasRequiredApplicator$1) return applicator$1;
  hasRequiredApplicator$1 = 1;
  Object.defineProperty(applicator$1, "__esModule", { value: true });
  const additionalItems_1 = requireAdditionalItems$1();
  const prefixItems_1 = requirePrefixItems$1();
  const items_1 = requireItems$1();
  const items2020_1 = requireItems2020$1();
  const contains_1 = requireContains$1();
  const dependencies_1 = requireDependencies$1();
  const propertyNames_1 = requirePropertyNames$1();
  const additionalProperties_1 = requireAdditionalProperties$1();
  const properties_1 = requireProperties$1();
  const patternProperties_1 = requirePatternProperties$1();
  const not_1 = requireNot$1();
  const anyOf_1 = requireAnyOf$1();
  const oneOf_1 = requireOneOf$1();
  const allOf_1 = requireAllOf$1();
  const if_1 = require_if$1();
  const thenElse_1 = requireThenElse$1();
  function getApplicator(draft2020 = false) {
    const applicator2 = [
      // any
      not_1.default,
      anyOf_1.default,
      oneOf_1.default,
      allOf_1.default,
      if_1.default,
      thenElse_1.default,
      // object
      propertyNames_1.default,
      additionalProperties_1.default,
      dependencies_1.default,
      properties_1.default,
      patternProperties_1.default
    ];
    if (draft2020)
      applicator2.push(prefixItems_1.default, items2020_1.default);
    else
      applicator2.push(additionalItems_1.default, items_1.default);
    applicator2.push(contains_1.default);
    return applicator2;
  }
  applicator$1.default = getApplicator;
  return applicator$1;
}
var format$4 = {};
var format$3 = {};
var hasRequiredFormat$4;
function requireFormat$4() {
  if (hasRequiredFormat$4) return format$3;
  hasRequiredFormat$4 = 1;
  Object.defineProperty(format$3, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const error = {
    message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
  };
  const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
      const { gen, data, $data, schema, schemaCode, it } = cxt;
      const { opts, errSchemaPath, schemaEnv, self } = it;
      if (!opts.validateFormats)
        return;
      if ($data)
        validate$DataFormat();
      else
        validateFormat();
      function validate$DataFormat() {
        const fmts = gen.scopeValue("formats", {
          ref: self.formats,
          code: opts.code.formats
        });
        const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
        const fType = gen.let("fType");
        const format2 = gen.let("format");
        gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format2, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format2, fDef));
        cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
        function unknownFmt() {
          if (opts.strictSchema === false)
            return codegen_1.nil;
          return (0, codegen_1._)`${schemaCode} && !${format2}`;
        }
        function invalidFmt() {
          const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : (0, codegen_1._)`${format2}(${data})`;
          const validData = (0, codegen_1._)`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
          return (0, codegen_1._)`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
        }
      }
      function validateFormat() {
        const formatDef = self.formats[schema];
        if (!formatDef) {
          unknownFormat();
          return;
        }
        if (formatDef === true)
          return;
        const [fmtType, format2, fmtRef] = getFormat(formatDef);
        if (fmtType === ruleType)
          cxt.pass(validCondition());
        function unknownFormat() {
          if (opts.strictSchema === false) {
            self.logger.warn(unknownMsg());
            return;
          }
          throw new Error(unknownMsg());
          function unknownMsg() {
            return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
          }
        }
        function getFormat(fmtDef) {
          const code2 = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
          const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code: code2 });
          if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
            return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
          }
          return ["string", fmtDef, fmt];
        }
        function validCondition() {
          if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
            if (!schemaEnv.$async)
              throw new Error("async format in sync schema");
            return (0, codegen_1._)`await ${fmtRef}(${data})`;
          }
          return typeof format2 == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
        }
      }
    }
  };
  format$3.default = def;
  return format$3;
}
var hasRequiredFormat$3;
function requireFormat$3() {
  if (hasRequiredFormat$3) return format$4;
  hasRequiredFormat$3 = 1;
  Object.defineProperty(format$4, "__esModule", { value: true });
  const format_1 = requireFormat$4();
  const format2 = [format_1.default];
  format$4.default = format2;
  return format$4;
}
var metadata$1 = {};
var hasRequiredMetadata$1;
function requireMetadata$1() {
  if (hasRequiredMetadata$1) return metadata$1;
  hasRequiredMetadata$1 = 1;
  Object.defineProperty(metadata$1, "__esModule", { value: true });
  metadata$1.contentVocabulary = metadata$1.metadataVocabulary = void 0;
  metadata$1.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ];
  metadata$1.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ];
  return metadata$1;
}
var hasRequiredDraft7$1;
function requireDraft7$1() {
  if (hasRequiredDraft7$1) return draft7$1;
  hasRequiredDraft7$1 = 1;
  Object.defineProperty(draft7$1, "__esModule", { value: true });
  const core_1 = requireCore$2();
  const validation_1 = requireValidation$1();
  const applicator_1 = requireApplicator$1();
  const format_1 = requireFormat$3();
  const metadata_1 = requireMetadata$1();
  const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary
  ];
  draft7$1.default = draft7Vocabularies;
  return draft7$1;
}
var discriminator$1 = {};
var types$1 = {};
var hasRequiredTypes$1;
function requireTypes$1() {
  if (hasRequiredTypes$1) return types$1;
  hasRequiredTypes$1 = 1;
  Object.defineProperty(types$1, "__esModule", { value: true });
  types$1.DiscrError = void 0;
  var DiscrError;
  (function(DiscrError2) {
    DiscrError2["Tag"] = "tag";
    DiscrError2["Mapping"] = "mapping";
  })(DiscrError || (types$1.DiscrError = DiscrError = {}));
  return types$1;
}
var hasRequiredDiscriminator$1;
function requireDiscriminator$1() {
  if (hasRequiredDiscriminator$1) return discriminator$1;
  hasRequiredDiscriminator$1 = 1;
  Object.defineProperty(discriminator$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen$1();
  const types_1 = requireTypes$1();
  const compile_1 = requireCompile$1();
  const ref_error_1 = requireRef_error$1();
  const util_1 = requireUtil$1();
  const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
  };
  const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
      const { gen, data, schema, parentSchema, it } = cxt;
      const { oneOf: oneOf2 } = parentSchema;
      if (!it.opts.discriminator) {
        throw new Error("discriminator: requires discriminator option");
      }
      const tagName = schema.propertyName;
      if (typeof tagName != "string")
        throw new Error("discriminator: requires propertyName");
      if (schema.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!oneOf2)
        throw new Error("discriminator: requires oneOf keyword");
      const valid2 = gen.let("valid", false);
      const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
      gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
      cxt.ok(valid2);
      function validateMapping() {
        const mapping = getMapping();
        gen.if(false);
        for (const tagValue in mapping) {
          gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
          gen.assign(valid2, applyTagSchema(mapping[tagValue]));
        }
        gen.else();
        cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
        gen.endIf();
      }
      function applyTagSchema(schemaProp) {
        const _valid = gen.name("valid");
        const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
        cxt.mergeEvaluated(schCxt, codegen_1.Name);
        return _valid;
      }
      function getMapping() {
        var _a;
        const oneOfMapping = {};
        const topRequired = hasRequired(parentSchema);
        let tagRequired = true;
        for (let i = 0; i < oneOf2.length; i++) {
          let sch = oneOf2[i];
          if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
            const ref2 = sch.$ref;
            sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref2);
            if (sch instanceof compile_1.SchemaEnv)
              sch = sch.schema;
            if (sch === void 0)
              throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref2);
          }
          const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
          if (typeof propSch != "object") {
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
          }
          tagRequired = tagRequired && (topRequired || hasRequired(sch));
          addMappings(propSch, i);
        }
        if (!tagRequired)
          throw new Error(`discriminator: "${tagName}" must be required`);
        return oneOfMapping;
        function hasRequired({ required: required2 }) {
          return Array.isArray(required2) && required2.includes(tagName);
        }
        function addMappings(sch, i) {
          if (sch.const) {
            addMapping(sch.const, i);
          } else if (sch.enum) {
            for (const tagValue of sch.enum) {
              addMapping(tagValue, i);
            }
          } else {
            throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
          }
        }
        function addMapping(tagValue, i) {
          if (typeof tagValue != "string" || tagValue in oneOfMapping) {
            throw new Error(`discriminator: "${tagName}" values must be unique strings`);
          }
          oneOfMapping[tagValue] = i;
        }
      }
    }
  };
  discriminator$1.default = def;
  return discriminator$1;
}
const $schema$1 = "http://json-schema.org/draft-07/schema#";
const $id$2 = "http://json-schema.org/draft-07/schema#";
const title$1 = "Core schema meta-schema";
const definitions$1 = { "schemaArray": { "type": "array", "minItems": 1, "items": { "$ref": "#" } }, "nonNegativeInteger": { "type": "integer", "minimum": 0 }, "nonNegativeIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] }, "simpleTypes": { "enum": ["array", "boolean", "integer", "null", "number", "object", "string"] }, "stringArray": { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "default": [] } };
const type$2 = ["object", "boolean"];
const properties$3 = { "$id": { "type": "string", "format": "uri-reference" }, "$schema": { "type": "string", "format": "uri" }, "$ref": { "type": "string", "format": "uri-reference" }, "$comment": { "type": "string" }, "title": { "type": "string" }, "description": { "type": "string" }, "default": true, "readOnly": { "type": "boolean", "default": false }, "examples": { "type": "array", "items": true }, "multipleOf": { "type": "number", "exclusiveMinimum": 0 }, "maximum": { "type": "number" }, "exclusiveMaximum": { "type": "number" }, "minimum": { "type": "number" }, "exclusiveMinimum": { "type": "number" }, "maxLength": { "$ref": "#/definitions/nonNegativeInteger" }, "minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "pattern": { "type": "string", "format": "regex" }, "additionalItems": { "$ref": "#" }, "items": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }], "default": true }, "maxItems": { "$ref": "#/definitions/nonNegativeInteger" }, "minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "uniqueItems": { "type": "boolean", "default": false }, "contains": { "$ref": "#" }, "maxProperties": { "$ref": "#/definitions/nonNegativeInteger" }, "minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "required": { "$ref": "#/definitions/stringArray" }, "additionalProperties": { "$ref": "#" }, "definitions": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "properties": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "patternProperties": { "type": "object", "additionalProperties": { "$ref": "#" }, "propertyNames": { "format": "regex" }, "default": {} }, "dependencies": { "type": "object", "additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] } }, "propertyNames": { "$ref": "#" }, "const": true, "enum": { "type": "array", "items": true, "minItems": 1, "uniqueItems": true }, "type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, { "type": "array", "items": { "$ref": "#/definitions/simpleTypes" }, "minItems": 1, "uniqueItems": true }] }, "format": { "type": "string" }, "contentMediaType": { "type": "string" }, "contentEncoding": { "type": "string" }, "if": { "$ref": "#" }, "then": { "$ref": "#" }, "else": { "$ref": "#" }, "allOf": { "$ref": "#/definitions/schemaArray" }, "anyOf": { "$ref": "#/definitions/schemaArray" }, "oneOf": { "$ref": "#/definitions/schemaArray" }, "not": { "$ref": "#" } };
const require$$3$1 = {
  $schema: $schema$1,
  $id: $id$2,
  title: title$1,
  definitions: definitions$1,
  type: type$2,
  properties: properties$3,
  "default": true
};
var hasRequiredAjv$1;
function requireAjv$1() {
  if (hasRequiredAjv$1) return ajv$1.exports;
  hasRequiredAjv$1 = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    const core_1 = requireCore$3();
    const draft7_1 = requireDraft7$1();
    const discriminator_1 = requireDiscriminator$1();
    const draft7MetaSchema = require$$3$1;
    const META_SUPPORT_DATA = ["/properties"];
    const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    class Ajv extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    }
    exports.Ajv = Ajv;
    module.exports = exports = Ajv;
    module.exports.Ajv = Ajv;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv;
    var validate_1 = requireValidate$1();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = requireCodegen$1();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = requireValidation_error$1();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = requireRef_error$1();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  })(ajv$1, ajv$1.exports);
  return ajv$1.exports;
}
var dist = { exports: {} };
var formats = {};
var hasRequiredFormats;
function requireFormats() {
  if (hasRequiredFormats) return formats;
  hasRequiredFormats = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
    function fmtDef(validate2, compare) {
      return { validate: validate2, compare };
    }
    exports.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: fmtDef(date, compareDate),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: fmtDef(time, compareTime),
      "date-time": fmtDef(date_time, compareDateTime),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: uri2,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte,
      // signed 32 bit integer
      int32: { type: "number", validate: validateInt32 },
      // signed 64 bit integer
      int64: { type: "number", validate: validateInt64 },
      // C-type float
      float: { type: "number", validate: validateNumber },
      // C-type double
      double: { type: "number", validate: validateNumber },
      // hint to the UI to hide input strings
      password: true,
      // unchecked string payload
      binary: true
    };
    exports.fastFormats = {
      ...exports.fullFormats,
      date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
      time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
      "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    };
    exports.formatNames = Object.keys(exports.fullFormats);
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function date(str) {
      const matches = DATE.exec(str);
      if (!matches)
        return false;
      const year = +matches[1];
      const month = +matches[2];
      const day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function compareDate(d1, d2) {
      if (!(d1 && d2))
        return void 0;
      if (d1 > d2)
        return 1;
      if (d1 < d2)
        return -1;
      return 0;
    }
    const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function time(str, withTimeZone) {
      const matches = TIME.exec(str);
      if (!matches)
        return false;
      const hour = +matches[1];
      const minute = +matches[2];
      const second = +matches[3];
      const timeZone = matches[5];
      return (hour <= 23 && minute <= 59 && second <= 59 || hour === 23 && minute === 59 && second === 60) && (!withTimeZone || timeZone !== "");
    }
    function compareTime(t1, t2) {
      if (!(t1 && t2))
        return void 0;
      const a1 = TIME.exec(t1);
      const a2 = TIME.exec(t2);
      if (!(a1 && a2))
        return void 0;
      t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
      t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
      if (t1 > t2)
        return 1;
      if (t1 < t2)
        return -1;
      return 0;
    }
    const DATE_TIME_SEPARATOR = /t|\s/i;
    function date_time(str) {
      const dateTime = str.split(DATE_TIME_SEPARATOR);
      return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
    }
    function compareDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
      const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
      const res = compareDate(d1, d2);
      if (res === void 0)
        return void 0;
      return res || compareTime(t1, t2);
    }
    const NOT_URI_FRAGMENT = /\/|:/;
    const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri2(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function byte(str) {
      BYTE.lastIndex = 0;
      return BYTE.test(str);
    }
    const MIN_INT32 = -(2 ** 31);
    const MAX_INT32 = 2 ** 31 - 1;
    function validateInt32(value) {
      return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
    }
    function validateInt64(value) {
      return Number.isInteger(value);
    }
    function validateNumber() {
      return true;
    }
    const Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str))
        return false;
      try {
        new RegExp(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  })(formats);
  return formats;
}
var limit = {};
var ajv = { exports: {} };
var core$1 = {};
var validate = {};
var boolSchema = {};
var errors = {};
var codegen = {};
var code$1 = {};
var hasRequiredCode$1;
function requireCode$1() {
  if (hasRequiredCode$1) return code$1;
  hasRequiredCode$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    class _CodeOrName {
    }
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class Name extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    exports.Name = Name;
    class _Code extends _CodeOrName {
      constructor(code2) {
        super();
        this._items = typeof code2 === "string" ? [code2] : code2;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
          if (c instanceof Name)
            names2[c.str] = (names2[c.str] || 0) + 1;
          return names2;
        }, {});
      }
    }
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code2 = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code2, args[i]);
        code2.push(strs[++i]);
      }
      return new _Code(code2);
    }
    exports._ = _;
    const plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code2, arg) {
      if (arg instanceof _Code)
        code2.push(...arg._items);
      else if (arg instanceof Name)
        code2.push(arg);
      else
        code2.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  })(code$1);
  return code$1;
}
var scope$1 = {};
var hasRequiredScope$1;
function requireScope$1() {
  if (hasRequiredScope$1) return scope$1;
  hasRequiredScope$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    const code_1 = requireCode$1();
    class ValueError extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    }
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    class Scope {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    }
    exports.Scope = Scope;
    class ValueScopeName extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    }
    exports.ValueScopeName = ValueScopeName;
    const line = (0, code_1._)`\n`;
    class ValueScope extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code2 = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code2 = (0, code_1._)`${code2}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code2 = (0, code_1._)`${code2}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code2;
      }
    }
    exports.ValueScope = ValueScope;
  })(scope$1);
  return scope$1;
}
var hasRequiredCodegen;
function requireCodegen() {
  if (hasRequiredCodegen) return codegen;
  hasRequiredCodegen = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    const code_1 = requireCode$1();
    const scope_1 = requireScope$1();
    var code_2 = requireCode$1();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = requireScope$1();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    class Node {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    }
    class Def extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names2, constants2) {
        if (!names2[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names2, constants2);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    }
    class Assign extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names2, constants2) {
        if (this.lhs instanceof code_1.Name && !names2[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
        return this;
      }
      get names() {
        const names2 = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names2, this.rhs);
      }
    }
    class AssignOp extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    }
    class Label extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    }
    class Break extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    }
    class Throw extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    }
    class AnyCode extends Node {
      constructor(code2) {
        super();
        this.code = code2;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names2, constants2) {
        this.code = optimizeExpr(this.code, names2, constants2);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    }
    class ParentNode extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code2, n) => code2 + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names2, constants2) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names2, constants2))
            continue;
          subtractNames(names2, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
      }
    }
    class BlockNode extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    }
    class Root extends ParentNode {
    }
    class Else extends BlockNode {
    }
    Else.kind = "else";
    class If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code2 = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code2 += "else " + this.else.render(opts);
        return code2;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new If(not2(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names2, constants2) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
        if (!(super.optimizeNames(names2, constants2) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names2, constants2);
        return this;
      }
      get names() {
        const names2 = super.names;
        addExprNames(names2, this.condition);
        if (this.else)
          addNames(names2, this.else.names);
        return names2;
      }
    }
    If.kind = "if";
    class For extends BlockNode {
    }
    For.kind = "for";
    class ForLoop extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names2, constants2) {
        if (!super.optimizeNames(names2, constants2))
          return;
        this.iteration = optimizeExpr(this.iteration, names2, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    }
    class ForRange extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names2 = addExprNames(super.names, this.from);
        return addExprNames(names2, this.to);
      }
    }
    class ForIter extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names2, constants2) {
        if (!super.optimizeNames(names2, constants2))
          return;
        this.iterable = optimizeExpr(this.iterable, names2, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    }
    class Func extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    }
    Func.kind = "func";
    class Return extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    }
    Return.kind = "return";
    class Try extends BlockNode {
      render(opts) {
        let code2 = "try" + super.render(opts);
        if (this.catch)
          code2 += this.catch.render(opts);
        if (this.finally)
          code2 += this.finally.render(opts);
        return code2;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names2, constants2) {
        var _a, _b;
        super.optimizeNames(names2, constants2);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
        return this;
      }
      get names() {
        const names2 = super.names;
        if (this.catch)
          addNames(names2, this.catch.names);
        if (this.finally)
          addNames(names2, this.finally.names);
        return names2;
      }
    }
    class Catch extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    }
    Catch.kind = "catch";
    class Finally extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    }
    Finally.kind = "finally";
    class CodeGen {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code2 = ["{"];
        for (const [key, value] of keyValues) {
          if (code2.length > 1)
            code2.push(",");
          code2.push(key);
          if (key !== value || this.opts.es5) {
            code2.push(":");
            (0, code_1.addCodeArg)(code2, value);
          }
        }
        code2.push("}");
        return new code_1._Code(code2);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node2, forBody) {
        this._blockNode(node2);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node2 = new Return();
        this._blockNode(node2);
        this.code(value);
        if (node2.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node2 = new Try();
        this._blockNode(node2);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node2.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node2.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node2) {
        this._currNode.nodes.push(node2);
        return this;
      }
      _blockNode(node2) {
        this._currNode.nodes.push(node2);
        this._nodes.push(node2);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node2) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node2;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node2) {
        const ns = this._nodes;
        ns[ns.length - 1] = node2;
      }
    }
    exports.CodeGen = CodeGen;
    function addNames(names2, from) {
      for (const n in from)
        names2[n] = (names2[n] || 0) + (from[n] || 0);
      return names2;
    }
    function addExprNames(names2, from) {
      return from instanceof code_1._CodeOrName ? addNames(names2, from.names) : names2;
    }
    function optimizeExpr(expr, names2, constants2) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items2, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items2.push(...c._items);
        else
          items2.push(c);
        return items2;
      }, []));
      function replaceName(n) {
        const c = constants2[n.str];
        if (c === void 0 || names2[n.str] !== 1)
          return n;
        delete names2[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
      }
    }
    function subtractNames(names2, from) {
      for (const n in from)
        names2[n] = (names2[n] || 0) - (from[n] || 0);
    }
    function not2(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not2;
    const andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    const orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  })(codegen);
  return codegen;
}
var util = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  Object.defineProperty(util, "__esModule", { value: true });
  util.checkStrictMode = util.getErrorPath = util.Type = util.useFunc = util.setEvaluated = util.evaluatedPropsToName = util.mergeEvaluated = util.eachItem = util.unescapeJsonPointer = util.escapeJsonPointer = util.escapeFragment = util.unescapeFragment = util.schemaRefOrVal = util.schemaHasRulesButRef = util.schemaHasRules = util.checkUnknownRules = util.alwaysValidSchema = util.toHash = void 0;
  const codegen_1 = requireCodegen();
  const code_1 = requireCode$1();
  function toHash(arr) {
    const hash = {};
    for (const item of arr)
      hash[item] = true;
    return hash;
  }
  util.toHash = toHash;
  function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
      return schema;
    if (Object.keys(schema).length === 0)
      return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
  }
  util.alwaysValidSchema = alwaysValidSchema;
  function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
      return;
    if (typeof schema === "boolean")
      return;
    const rules2 = self.RULES.keywords;
    for (const key in schema) {
      if (!rules2[key])
        checkStrictMode(it, `unknown keyword: "${key}"`);
    }
  }
  util.checkUnknownRules = checkUnknownRules;
  function schemaHasRules(schema, rules2) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (rules2[key])
        return true;
    return false;
  }
  util.schemaHasRules = schemaHasRules;
  function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (key !== "$ref" && RULES.all[key])
        return true;
    return false;
  }
  util.schemaHasRulesButRef = schemaHasRulesButRef;
  function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword2, $data) {
    if (!$data) {
      if (typeof schema == "number" || typeof schema == "boolean")
        return schema;
      if (typeof schema == "string")
        return (0, codegen_1._)`${schema}`;
    }
    return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword2)}`;
  }
  util.schemaRefOrVal = schemaRefOrVal;
  function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
  }
  util.unescapeFragment = unescapeFragment;
  function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
  }
  util.escapeFragment = escapeFragment;
  function escapeJsonPointer(str) {
    if (typeof str == "number")
      return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  util.escapeJsonPointer = escapeJsonPointer;
  function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  util.unescapeJsonPointer = unescapeJsonPointer;
  function eachItem(xs, f) {
    if (Array.isArray(xs)) {
      for (const x of xs)
        f(x);
    } else {
      f(xs);
    }
  }
  util.eachItem = eachItem;
  function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
    return (gen, from, to, toName) => {
      const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
      return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
  }
  util.mergeEvaluated = {
    props: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
        gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
      }),
      mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
        if (from === true) {
          gen.assign(to, true);
        } else {
          gen.assign(to, (0, codegen_1._)`${to} || {}`);
          setEvaluated(gen, to, from);
        }
      }),
      mergeValues: (from, to) => from === true ? true : { ...from, ...to },
      resultToName: evaluatedPropsToName
    }),
    items: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
      mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
      mergeValues: (from, to) => from === true ? true : Math.max(from, to),
      resultToName: (gen, items2) => gen.var("items", items2)
    })
  };
  function evaluatedPropsToName(gen, ps) {
    if (ps === true)
      return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._)`{}`);
    if (ps !== void 0)
      setEvaluated(gen, props, ps);
    return props;
  }
  util.evaluatedPropsToName = evaluatedPropsToName;
  function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
  }
  util.setEvaluated = setEvaluated;
  const snippets = {};
  function useFunc(gen, f) {
    return gen.scopeValue("func", {
      ref: f,
      code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
    });
  }
  util.useFunc = useFunc;
  var Type;
  (function(Type2) {
    Type2[Type2["Num"] = 0] = "Num";
    Type2[Type2["Str"] = 1] = "Str";
  })(Type || (util.Type = Type = {}));
  function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    if (dataProp instanceof codegen_1.Name) {
      const isNumber = dataPropType === Type.Num;
      return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
  }
  util.getErrorPath = getErrorPath;
  function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
      return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
      throw new Error(msg);
    it.self.logger.warn(msg);
  }
  util.checkStrictMode = checkStrictMode;
  return util;
}
var names = {};
var hasRequiredNames;
function requireNames() {
  if (hasRequiredNames) return names;
  hasRequiredNames = 1;
  Object.defineProperty(names, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const names$12 = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    // null or array of validation errors
    errors: new codegen_1.Name("errors"),
    // counter of validation errors
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart")
  };
  names.default = names$12;
  return names;
}
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    const codegen_1 = requireCodegen();
    const util_1 = requireUtil();
    const names_1 = requireNames();
    exports.keywordError = {
      message: ({ keyword: keyword2 }) => (0, codegen_1.str)`must pass "${keyword2}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword: keyword2, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword2}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword2}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword2}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    const E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword2}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword: keyword2, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  })(errors);
  return errors;
}
var hasRequiredBoolSchema;
function requireBoolSchema() {
  if (hasRequiredBoolSchema) return boolSchema;
  hasRequiredBoolSchema = 1;
  Object.defineProperty(boolSchema, "__esModule", { value: true });
  boolSchema.boolOrEmptySchema = boolSchema.topBoolOrEmptySchema = void 0;
  const errors_1 = requireErrors();
  const codegen_1 = requireCodegen();
  const names_1 = requireNames();
  const boolError = {
    message: "boolean schema is false"
  };
  function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
      falseSchemaError(it, false);
    } else if (typeof schema == "object" && schema.$async === true) {
      gen.return(names_1.default.data);
    } else {
      gen.assign((0, codegen_1._)`${validateName}.errors`, null);
      gen.return(true);
    }
  }
  boolSchema.topBoolOrEmptySchema = topBoolOrEmptySchema;
  function boolOrEmptySchema(it, valid2) {
    const { gen, schema } = it;
    if (schema === false) {
      gen.var(valid2, false);
      falseSchemaError(it);
    } else {
      gen.var(valid2, true);
    }
  }
  boolSchema.boolOrEmptySchema = boolOrEmptySchema;
  function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    const cxt = {
      gen,
      keyword: "false schema",
      data,
      schema: false,
      schemaCode: false,
      schemaValue: false,
      params: {},
      it
    };
    (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
  }
  return boolSchema;
}
var dataType = {};
var rules = {};
var hasRequiredRules;
function requireRules() {
  if (hasRequiredRules) return rules;
  hasRequiredRules = 1;
  Object.defineProperty(rules, "__esModule", { value: true });
  rules.getRules = rules.isJSONType = void 0;
  const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
  const jsonTypes = new Set(_jsonTypes);
  function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
  }
  rules.isJSONType = isJSONType;
  function getRules() {
    const groups = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...groups, integer: true, boolean: true, null: true },
      rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  rules.getRules = getRules;
  return rules;
}
var applicability = {};
var hasRequiredApplicability;
function requireApplicability() {
  if (hasRequiredApplicability) return applicability;
  hasRequiredApplicability = 1;
  Object.defineProperty(applicability, "__esModule", { value: true });
  applicability.shouldUseRule = applicability.shouldUseGroup = applicability.schemaHasRulesForType = void 0;
  function schemaHasRulesForType({ schema, self }, type2) {
    const group = self.RULES.types[type2];
    return group && group !== true && shouldUseGroup(schema, group);
  }
  applicability.schemaHasRulesForType = schemaHasRulesForType;
  function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
  }
  applicability.shouldUseGroup = shouldUseGroup;
  function shouldUseRule(schema, rule) {
    var _a;
    return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
  }
  applicability.shouldUseRule = shouldUseRule;
  return applicability;
}
var hasRequiredDataType;
function requireDataType() {
  if (hasRequiredDataType) return dataType;
  hasRequiredDataType = 1;
  Object.defineProperty(dataType, "__esModule", { value: true });
  dataType.reportTypeError = dataType.checkDataTypes = dataType.checkDataType = dataType.coerceAndCheckDataType = dataType.getJSONTypes = dataType.getSchemaTypes = dataType.DataType = void 0;
  const rules_1 = requireRules();
  const applicability_1 = requireApplicability();
  const errors_1 = requireErrors();
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  var DataType;
  (function(DataType2) {
    DataType2[DataType2["Correct"] = 0] = "Correct";
    DataType2[DataType2["Wrong"] = 1] = "Wrong";
  })(DataType || (dataType.DataType = DataType = {}));
  function getSchemaTypes(schema) {
    const types2 = getJSONTypes(schema.type);
    const hasNull = types2.includes("null");
    if (hasNull) {
      if (schema.nullable === false)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!types2.length && schema.nullable !== void 0) {
        throw new Error('"nullable" cannot be used without "type"');
      }
      if (schema.nullable === true)
        types2.push("null");
    }
    return types2;
  }
  dataType.getSchemaTypes = getSchemaTypes;
  function getJSONTypes(ts) {
    const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types2.every(rules_1.isJSONType))
      return types2;
    throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
  }
  dataType.getJSONTypes = getJSONTypes;
  function coerceAndCheckDataType(it, types2) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types2, opts.coerceTypes);
    const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types2[0]));
    if (checkTypes) {
      const wrongType = checkDataTypes(types2, data, opts.strictNumbers, DataType.Wrong);
      gen.if(wrongType, () => {
        if (coerceTo.length)
          coerceData(it, types2, coerceTo);
        else
          reportTypeError(it);
      });
    }
    return checkTypes;
  }
  dataType.coerceAndCheckDataType = coerceAndCheckDataType;
  const COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function coerceToTypes(types2, coerceTypes) {
    return coerceTypes ? types2.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
  }
  function coerceData(it, types2, coerceTo) {
    const { gen, data, opts } = it;
    const dataType2 = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
    if (opts.coerceTypes === "array") {
      gen.if((0, codegen_1._)`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType2, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types2, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._)`${coerced} !== undefined`);
    for (const t of coerceTo) {
      if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
        coerceSpecificType(t);
      }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
      gen.assign(data, coerced);
      assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
      switch (t) {
        case "string":
          gen.elseIf((0, codegen_1._)`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
          return;
        case "number":
          gen.elseIf((0, codegen_1._)`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
          return;
        case "integer":
          gen.elseIf((0, codegen_1._)`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
          return;
        case "boolean":
          gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
          return;
        case "null":
          gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
          gen.assign(coerced, null);
          return;
        case "array":
          gen.elseIf((0, codegen_1._)`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
      }
    }
  }
  function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
  }
  function checkDataType(dataType2, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType2) {
      case "null":
        return (0, codegen_1._)`${data} ${EQ} null`;
      case "array":
        cond = (0, codegen_1._)`Array.isArray(${data})`;
        break;
      case "object":
        cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
        break;
      case "integer":
        cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
        break;
      case "number":
        cond = numCond();
        break;
      default:
        return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType2}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
      return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
    }
  }
  dataType.checkDataType = checkDataType;
  function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
      return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types2 = (0, util_1.toHash)(dataTypes);
    if (types2.array && types2.object) {
      const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
      cond = types2.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
      delete types2.null;
      delete types2.array;
      delete types2.object;
    } else {
      cond = codegen_1.nil;
    }
    if (types2.number)
      delete types2.integer;
    for (const t in types2)
      cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
  }
  dataType.checkDataTypes = checkDataTypes;
  const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
  };
  function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
  }
  dataType.reportTypeError = reportTypeError;
  function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
      gen,
      keyword: "type",
      data,
      schema: schema.type,
      schemaCode,
      schemaValue: schemaCode,
      parentSchema: schema,
      params: {},
      it
    };
  }
  return dataType;
}
var defaults = {};
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults;
  hasRequiredDefaults = 1;
  Object.defineProperty(defaults, "__esModule", { value: true });
  defaults.assignDefaults = void 0;
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  function assignDefaults(it, ty) {
    const { properties: properties2, items: items2 } = it.schema;
    if (ty === "object" && properties2) {
      for (const key in properties2) {
        assignDefault(it, key, properties2[key].default);
      }
    } else if (ty === "array" && Array.isArray(items2)) {
      items2.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
  }
  defaults.assignDefaults = assignDefaults;
  function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === void 0)
      return;
    const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
      (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
      return;
    }
    let condition = (0, codegen_1._)`${childData} === undefined`;
    if (opts.useDefaults === "empty") {
      condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
    }
    gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
  }
  return defaults;
}
var keyword = {};
var code = {};
var hasRequiredCode;
function requireCode() {
  if (hasRequiredCode) return code;
  hasRequiredCode = 1;
  Object.defineProperty(code, "__esModule", { value: true });
  code.validateUnion = code.validateArray = code.usePattern = code.callValidateCode = code.schemaProperties = code.allSchemaProperties = code.noPropertyInData = code.propertyInData = code.isOwnProperty = code.hasPropFunc = code.reportMissingProp = code.checkMissingProp = code.checkReportMissingProp = void 0;
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const names_1 = requireNames();
  const util_2 = requireUtil();
  function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
      cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
      cxt.error();
    });
  }
  code.checkReportMissingProp = checkReportMissingProp;
  function checkMissingProp({ gen, data, it: { opts } }, properties2, missing) {
    return (0, codegen_1.or)(...properties2.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
  }
  code.checkMissingProp = checkMissingProp;
  function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
  }
  code.reportMissingProp = reportMissingProp;
  function hasPropFunc(gen) {
    return gen.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
    });
  }
  code.hasPropFunc = hasPropFunc;
  function isOwnProperty(gen, data, property) {
    return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
  }
  code.isOwnProperty = isOwnProperty;
  function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
  }
  code.propertyInData = propertyInData;
  function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
  }
  code.noPropertyInData = noPropertyInData;
  function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
  }
  code.allSchemaProperties = allSchemaProperties;
  function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
  }
  code.schemaProperties = schemaProperties;
  function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
      [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
      [names_1.default.parentData, it.parentData],
      [names_1.default.parentDataProperty, it.parentDataProperty],
      [names_1.default.rootData, names_1.default.rootData]
    ];
    if (it.opts.dynamicRef)
      valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
  }
  code.callValidateCode = callValidateCode;
  const newRegExp = (0, codegen_1._)`new RegExp`;
  function usePattern({ gen, it: { opts } }, pattern2) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern2, u);
    return gen.scopeValue("pattern", {
      key: rx.toString(),
      ref: rx,
      code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern2}, ${u})`
    });
  }
  code.usePattern = usePattern;
  function validateArray(cxt) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid2 = gen.name("valid");
    if (it.allErrors) {
      const validArr = gen.let("valid", true);
      validateItems(() => gen.assign(validArr, false));
      return validArr;
    }
    gen.var(valid2, true);
    validateItems(() => gen.break());
    return valid2;
    function validateItems(notValid) {
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      gen.forRange("i", 0, len, (i) => {
        cxt.subschema({
          keyword: keyword2,
          dataProp: i,
          dataPropType: util_1.Type.Num
        }, valid2);
        gen.if((0, codegen_1.not)(valid2), notValid);
      });
    }
  }
  code.validateArray = validateArray;
  function validateUnion(cxt) {
    const { gen, schema, keyword: keyword2, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
      return;
    const valid2 = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
      const schCxt = cxt.subschema({
        keyword: keyword2,
        schemaProp: i,
        compositeRule: true
      }, schValid);
      gen.assign(valid2, (0, codegen_1._)`${valid2} || ${schValid}`);
      const merged = cxt.mergeValidEvaluated(schCxt, schValid);
      if (!merged)
        gen.if((0, codegen_1.not)(valid2));
    }));
    cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
  }
  code.validateUnion = validateUnion;
  return code;
}
var hasRequiredKeyword;
function requireKeyword() {
  if (hasRequiredKeyword) return keyword;
  hasRequiredKeyword = 1;
  Object.defineProperty(keyword, "__esModule", { value: true });
  keyword.validateKeywordUsage = keyword.validSchemaType = keyword.funcKeywordCode = keyword.macroKeywordCode = void 0;
  const codegen_1 = requireCodegen();
  const names_1 = requireNames();
  const code_1 = requireCode();
  const errors_1 = requireErrors();
  function macroKeywordCode(cxt, def) {
    const { gen, keyword: keyword2, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword2, macroSchema);
    if (it.opts.validateSchema !== false)
      it.self.validateSchema(macroSchema, true);
    const valid2 = gen.name("valid");
    cxt.subschema({
      schema: macroSchema,
      schemaPath: codegen_1.nil,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
      topSchemaRef: schemaRef,
      compositeRule: true
    }, valid2);
    cxt.pass(valid2, () => cxt.error(true));
  }
  keyword.macroKeywordCode = macroKeywordCode;
  function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword: keyword2, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate2 = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword2, validate2);
    const valid2 = gen.let("valid");
    cxt.block$data(valid2, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid2);
    function validateKeyword() {
      if (def.errors === false) {
        assignValid();
        if (def.modifying)
          modifyData(cxt);
        reportErrs(() => cxt.error());
      } else {
        const ruleErrs = def.async ? validateAsync() : validateSync();
        if (def.modifying)
          modifyData(cxt);
        reportErrs(() => addErrs(cxt, ruleErrs));
      }
    }
    function validateAsync() {
      const ruleErrs = gen.let("ruleErrs", null);
      gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid2, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
      return ruleErrs;
    }
    function validateSync() {
      const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
      gen.assign(validateErrs, null);
      assignValid(codegen_1.nil);
      return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
      const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
      const passSchema = !("compile" in def && !$data || def.schema === false);
      gen.assign(valid2, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors2) {
      var _a2;
      gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid2), errors2);
    }
  }
  keyword.funcKeywordCode = funcKeywordCode;
  function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
  }
  function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
      gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
  }
  function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
      throw new Error("async keyword in sync schema");
  }
  function useKeyword(gen, keyword2, result) {
    if (result === void 0)
      throw new Error(`keyword "${keyword2}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
  }
  function validSchemaType(schema, schemaType, allowUndefined = false) {
    return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
  }
  keyword.validSchemaType = validSchemaType;
  function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword2) {
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword2) : def.keyword !== keyword2) {
      throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
      throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
      const valid2 = def.validateSchema(schema[keyword2]);
      if (!valid2) {
        const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
        if (opts.validateSchema === "log")
          self.logger.error(msg);
        else
          throw new Error(msg);
      }
    }
  }
  keyword.validateKeywordUsage = validateKeywordUsage;
  return keyword;
}
var subschema = {};
var hasRequiredSubschema;
function requireSubschema() {
  if (hasRequiredSubschema) return subschema;
  hasRequiredSubschema = 1;
  Object.defineProperty(subschema, "__esModule", { value: true });
  subschema.extendSubschemaMode = subschema.extendSubschemaData = subschema.getSubschema = void 0;
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  function getSubschema(it, { keyword: keyword2, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword2 !== void 0 && schema !== void 0) {
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword2 !== void 0) {
      const sch = it.schema[keyword2];
      return schemaProp === void 0 ? {
        schema: sch,
        schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword2)}`,
        errSchemaPath: `${it.errSchemaPath}/${keyword2}`
      } : {
        schema: sch[schemaProp],
        schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword2)}${(0, codegen_1.getProperty)(schemaProp)}`,
        errSchemaPath: `${it.errSchemaPath}/${keyword2}/${(0, util_1.escapeFragment)(schemaProp)}`
      };
    }
    if (schema !== void 0) {
      if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      }
      return {
        schema,
        schemaPath,
        topSchemaRef,
        errSchemaPath
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  subschema.getSubschema = getSubschema;
  function extendSubschemaData(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== void 0 && dataProp !== void 0) {
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== void 0) {
      const { errorPath, dataPathArr, opts } = it;
      const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
      dataContextProps(nextData);
      subschema2.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
      subschema2.parentDataProperty = (0, codegen_1._)`${dataProp}`;
      subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
    }
    if (data !== void 0) {
      const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
      dataContextProps(nextData);
      if (propertyName !== void 0)
        subschema2.propertyName = propertyName;
    }
    if (dataTypes)
      subschema2.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
      subschema2.data = _nextData;
      subschema2.dataLevel = it.dataLevel + 1;
      subschema2.dataTypes = [];
      it.definedProperties = /* @__PURE__ */ new Set();
      subschema2.parentData = it.data;
      subschema2.dataNames = [...it.dataNames, _nextData];
    }
  }
  subschema.extendSubschemaData = extendSubschemaData;
  function extendSubschemaMode(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== void 0)
      subschema2.compositeRule = compositeRule;
    if (createErrors !== void 0)
      subschema2.createErrors = createErrors;
    if (allErrors !== void 0)
      subschema2.allErrors = allErrors;
    subschema2.jtdDiscriminator = jtdDiscriminator;
    subschema2.jtdMetadata = jtdMetadata;
  }
  subschema.extendSubschemaMode = extendSubschemaMode;
  return subschema;
}
var resolve = {};
var jsonSchemaTraverse = { exports: {} };
var hasRequiredJsonSchemaTraverse;
function requireJsonSchemaTraverse() {
  if (hasRequiredJsonSchemaTraverse) return jsonSchemaTraverse.exports;
  hasRequiredJsonSchemaTraverse = 1;
  var traverse = jsonSchemaTraverse.exports = function(schema, opts, cb) {
    if (typeof opts == "function") {
      cb = opts;
      opts = {};
    }
    cb = opts.cb || cb;
    var pre = typeof cb == "function" ? cb : cb.pre || function() {
    };
    var post = cb.post || function() {
    };
    _traverse(opts, pre, post, schema, "", schema);
  };
  traverse.keywords = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true,
    if: true,
    then: true,
    else: true
  };
  traverse.arrayKeywords = {
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
  };
  traverse.propsKeywords = {
    $defs: true,
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true
  };
  traverse.skipKeywords = {
    default: true,
    enum: true,
    const: true,
    required: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    multipleOf: true,
    maxLength: true,
    minLength: true,
    pattern: true,
    format: true,
    maxItems: true,
    minItems: true,
    uniqueItems: true,
    maxProperties: true,
    minProperties: true
  };
  function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (schema && typeof schema == "object" && !Array.isArray(schema)) {
      pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      for (var key in schema) {
        var sch = schema[key];
        if (Array.isArray(sch)) {
          if (key in traverse.arrayKeywords) {
            for (var i = 0; i < sch.length; i++)
              _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
          }
        } else if (key in traverse.propsKeywords) {
          if (sch && typeof sch == "object") {
            for (var prop in sch)
              _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
          }
        } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
          _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
        }
      }
      post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    }
  }
  function escapeJsonPtr(str) {
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return jsonSchemaTraverse.exports;
}
var hasRequiredResolve;
function requireResolve() {
  if (hasRequiredResolve) return resolve;
  hasRequiredResolve = 1;
  Object.defineProperty(resolve, "__esModule", { value: true });
  resolve.getSchemaRefs = resolve.resolveUrl = resolve.normalizeId = resolve._getFullPath = resolve.getFullPath = resolve.inlineRef = void 0;
  const util_1 = requireUtil();
  const equal2 = requireFastDeepEqual();
  const traverse = requireJsonSchemaTraverse();
  const SIMPLE_INLINED = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function inlineRef(schema, limit2 = true) {
    if (typeof schema == "boolean")
      return true;
    if (limit2 === true)
      return !hasRef(schema);
    if (!limit2)
      return false;
    return countKeys(schema) <= limit2;
  }
  resolve.inlineRef = inlineRef;
  const REF_KEYWORDS = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function hasRef(schema) {
    for (const key in schema) {
      if (REF_KEYWORDS.has(key))
        return true;
      const sch = schema[key];
      if (Array.isArray(sch) && sch.some(hasRef))
        return true;
      if (typeof sch == "object" && hasRef(sch))
        return true;
    }
    return false;
  }
  function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
      if (key === "$ref")
        return Infinity;
      count++;
      if (SIMPLE_INLINED.has(key))
        continue;
      if (typeof schema[key] == "object") {
        (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
      }
      if (count === Infinity)
        return Infinity;
    }
    return count;
  }
  function getFullPath(resolver, id2 = "", normalize) {
    if (normalize !== false)
      id2 = normalizeId(id2);
    const p = resolver.parse(id2);
    return _getFullPath(resolver, p);
  }
  resolve.getFullPath = getFullPath;
  function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
  }
  resolve._getFullPath = _getFullPath;
  const TRAILING_SLASH_HASH = /#\/?$/;
  function normalizeId(id2) {
    return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
  }
  resolve.normalizeId = normalizeId;
  function resolveUrl(resolver, baseId, id2) {
    id2 = normalizeId(id2);
    return resolver.resolve(baseId, id2);
  }
  resolve.resolveUrl = resolveUrl;
  const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
  function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
      return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = /* @__PURE__ */ new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
      if (parentJsonPtr === void 0)
        return;
      const fullPath = pathPrefix + jsonPtr;
      let innerBaseId = baseIds[parentJsonPtr];
      if (typeof sch[schemaId] == "string")
        innerBaseId = addRef.call(this, sch[schemaId]);
      addAnchor.call(this, sch.$anchor);
      addAnchor.call(this, sch.$dynamicAnchor);
      baseIds[jsonPtr] = innerBaseId;
      function addRef(ref2) {
        const _resolve = this.opts.uriResolver.resolve;
        ref2 = normalizeId(innerBaseId ? _resolve(innerBaseId, ref2) : ref2);
        if (schemaRefs.has(ref2))
          throw ambiguos(ref2);
        schemaRefs.add(ref2);
        let schOrRef = this.refs[ref2];
        if (typeof schOrRef == "string")
          schOrRef = this.refs[schOrRef];
        if (typeof schOrRef == "object") {
          checkAmbiguosRef(sch, schOrRef.schema, ref2);
        } else if (ref2 !== normalizeId(fullPath)) {
          if (ref2[0] === "#") {
            checkAmbiguosRef(sch, localRefs[ref2], ref2);
            localRefs[ref2] = sch;
          } else {
            this.refs[ref2] = fullPath;
          }
        }
        return ref2;
      }
      function addAnchor(anchor) {
        if (typeof anchor == "string") {
          if (!ANCHOR.test(anchor))
            throw new Error(`invalid anchor "${anchor}"`);
          addRef.call(this, `#${anchor}`);
        }
      }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref2) {
      if (sch2 !== void 0 && !equal2(sch1, sch2))
        throw ambiguos(ref2);
    }
    function ambiguos(ref2) {
      return new Error(`reference "${ref2}" resolves to more than one schema`);
    }
  }
  resolve.getSchemaRefs = getSchemaRefs;
  return resolve;
}
var hasRequiredValidate;
function requireValidate() {
  if (hasRequiredValidate) return validate;
  hasRequiredValidate = 1;
  Object.defineProperty(validate, "__esModule", { value: true });
  validate.getData = validate.KeywordCxt = validate.validateFunctionCode = void 0;
  const boolSchema_1 = requireBoolSchema();
  const dataType_1 = requireDataType();
  const applicability_1 = requireApplicability();
  const dataType_2 = requireDataType();
  const defaults_1 = requireDefaults();
  const keyword_1 = requireKeyword();
  const subschema_1 = requireSubschema();
  const codegen_1 = requireCodegen();
  const names_1 = requireNames();
  const resolve_1 = requireResolve();
  const util_1 = requireUtil();
  const errors_1 = requireErrors();
  function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
      checkKeywords(it);
      if (schemaCxtHasRules(it)) {
        topSchemaObjCode(it);
        return;
      }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
  }
  validate.validateFunctionCode = validateFunctionCode;
  function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
      gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
        gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
        destructureValCxtES5(gen, opts);
        gen.code(body);
      });
    } else {
      gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
  }
  function destructureValCxt(opts) {
    return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
  }
  function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
      gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
      gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
      gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
      gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
      if (opts.dynamicRef)
        gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
      gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
      gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
      gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
      gen.var(names_1.default.rootData, names_1.default.data);
      if (opts.dynamicRef)
        gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
    });
  }
  function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      checkNoDefault(it);
      gen.let(names_1.default.vErrors, null);
      gen.let(names_1.default.errors, 0);
      if (opts.unevaluated)
        resetEvaluated(it);
      typeAndKeywords(it);
      returnResults(it);
    });
    return;
  }
  function resetEvaluated(it) {
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
    gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
    gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
  }
  function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
  }
  function subschemaCode(it, valid2) {
    if (isSchemaObj(it)) {
      checkKeywords(it);
      if (schemaCxtHasRules(it)) {
        subSchemaObjCode(it, valid2);
        return;
      }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid2);
  }
  function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (self.RULES.all[key])
        return true;
    return false;
  }
  function isSchemaObj(it) {
    return typeof it.schema != "boolean";
  }
  function subSchemaObjCode(it, valid2) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
      commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    gen.var(valid2, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
  }
  function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
  }
  function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
      return schemaKeywords(it, [], false, errsCount);
    const types2 = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types2);
    schemaKeywords(it, types2, !checkedTypes, errsCount);
  }
  function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
      self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
  }
  function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
      (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
  }
  function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
      it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
  }
  function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
      gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
    } else if (typeof opts.$comment == "function") {
      const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
      const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
      gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
  }
  function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
      gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
    } else {
      gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
      if (opts.unevaluated)
        assignEvaluated(it);
      gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
    }
  }
  function assignEvaluated({ gen, evaluated, props, items: items2 }) {
    if (props instanceof codegen_1.Name)
      gen.assign((0, codegen_1._)`${evaluated}.props`, props);
    if (items2 instanceof codegen_1.Name)
      gen.assign((0, codegen_1._)`${evaluated}.items`, items2);
  }
  function schemaKeywords(it, types2, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
      gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
      return;
    }
    if (!opts.jtd)
      checkStrictTypes(it, types2);
    gen.block(() => {
      for (const group of RULES.rules)
        groupKeywords(group);
      groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
      if (!(0, applicability_1.shouldUseGroup)(schema, group))
        return;
      if (group.type) {
        gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
        iterateKeywords(it, group);
        if (types2.length === 1 && types2[0] === group.type && typeErrors) {
          gen.else();
          (0, dataType_2.reportTypeError)(it);
        }
        gen.endIf();
      } else {
        iterateKeywords(it, group);
      }
      if (!allErrors)
        gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
    }
  }
  function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults } } = it;
    if (useDefaults)
      (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
      for (const rule of group.rules) {
        if ((0, applicability_1.shouldUseRule)(schema, rule)) {
          keywordCode(it, rule.keyword, rule.definition, group.type);
        }
      }
    });
  }
  function checkStrictTypes(it, types2) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
      return;
    checkContextTypes(it, types2);
    if (!it.opts.allowUnionTypes)
      checkMultipleTypes(it, types2);
    checkKeywordTypes(it, it.dataTypes);
  }
  function checkContextTypes(it, types2) {
    if (!types2.length)
      return;
    if (!it.dataTypes.length) {
      it.dataTypes = types2;
      return;
    }
    types2.forEach((t) => {
      if (!includesType(it.dataTypes, t)) {
        strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
      }
    });
    narrowSchemaTypes(it, types2);
  }
  function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
      strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
  }
  function checkKeywordTypes(it, ts) {
    const rules2 = it.self.RULES.all;
    for (const keyword2 in rules2) {
      const rule = rules2[keyword2];
      if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
        const { type: type2 } = rule.definition;
        if (type2.length && !type2.some((t) => hasApplicableType(ts, t))) {
          strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
        }
      }
    }
  }
  function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
  }
  function includesType(ts, t) {
    return ts.includes(t) || t === "integer" && ts.includes("number");
  }
  function narrowSchemaTypes(it, withTypes) {
    const ts = [];
    for (const t of it.dataTypes) {
      if (includesType(withTypes, t))
        ts.push(t);
      else if (withTypes.includes("integer") && t === "number")
        ts.push("integer");
    }
    it.dataTypes = ts;
  }
  function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
  }
  class KeywordCxt {
    constructor(it, def, keyword2) {
      (0, keyword_1.validateKeywordUsage)(it, def, keyword2);
      this.gen = it.gen;
      this.allErrors = it.allErrors;
      this.keyword = keyword2;
      this.data = it.data;
      this.schema = it.schema[keyword2];
      this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
      this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword2, this.$data);
      this.schemaType = def.schemaType;
      this.parentSchema = it.schema;
      this.params = {};
      this.it = it;
      this.def = def;
      if (this.$data) {
        this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
      } else {
        this.schemaCode = this.schemaValue;
        if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
          throw new Error(`${keyword2} value must be ${JSON.stringify(def.schemaType)}`);
        }
      }
      if ("code" in def ? def.trackErrors : def.errors !== false) {
        this.errsCount = it.gen.const("_errs", names_1.default.errors);
      }
    }
    result(condition, successAction, failAction) {
      this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
      this.gen.if(condition);
      if (failAction)
        failAction();
      else
        this.error();
      if (successAction) {
        this.gen.else();
        successAction();
        if (this.allErrors)
          this.gen.endIf();
      } else {
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
    }
    pass(condition, failAction) {
      this.failResult((0, codegen_1.not)(condition), void 0, failAction);
    }
    fail(condition) {
      if (condition === void 0) {
        this.error();
        if (!this.allErrors)
          this.gen.if(false);
        return;
      }
      this.gen.if(condition);
      this.error();
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
    fail$data(condition) {
      if (!this.$data)
        return this.fail(condition);
      const { schemaCode } = this;
      this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
      if (errorParams) {
        this.setParams(errorParams);
        this._error(append, errorPaths);
        this.setParams({});
        return;
      }
      this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
      (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
      (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
      if (!this.allErrors)
        this.gen.if(cond);
    }
    setParams(obj, assign) {
      if (assign)
        Object.assign(this.params, obj);
      else
        this.params = obj;
    }
    block$data(valid2, codeBlock, $dataValid = codegen_1.nil) {
      this.gen.block(() => {
        this.check$data(valid2, $dataValid);
        codeBlock();
      });
    }
    check$data(valid2 = codegen_1.nil, $dataValid = codegen_1.nil) {
      if (!this.$data)
        return;
      const { gen, schemaCode, schemaType, def } = this;
      gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
      if (valid2 !== codegen_1.nil)
        gen.assign(valid2, true);
      if (schemaType.length || def.validateSchema) {
        gen.elseIf(this.invalid$data());
        this.$dataError();
        if (valid2 !== codegen_1.nil)
          gen.assign(valid2, false);
      }
      gen.else();
    }
    invalid$data() {
      const { gen, schemaCode, schemaType, def, it } = this;
      return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
      function wrong$DataType() {
        if (schemaType.length) {
          if (!(schemaCode instanceof codegen_1.Name))
            throw new Error("ajv implementation error");
          const st = Array.isArray(schemaType) ? schemaType : [schemaType];
          return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
        }
        return codegen_1.nil;
      }
      function invalid$DataSchema() {
        if (def.validateSchema) {
          const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
          return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
        }
        return codegen_1.nil;
      }
    }
    subschema(appl, valid2) {
      const subschema2 = (0, subschema_1.getSubschema)(this.it, appl);
      (0, subschema_1.extendSubschemaData)(subschema2, this.it, appl);
      (0, subschema_1.extendSubschemaMode)(subschema2, appl);
      const nextContext = { ...this.it, ...subschema2, items: void 0, props: void 0 };
      subschemaCode(nextContext, valid2);
      return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
      const { it, gen } = this;
      if (!it.opts.unevaluated)
        return;
      if (it.props !== true && schemaCxt.props !== void 0) {
        it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
      }
      if (it.items !== true && schemaCxt.items !== void 0) {
        it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
      }
    }
    mergeValidEvaluated(schemaCxt, valid2) {
      const { it, gen } = this;
      if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
        gen.if(valid2, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
        return true;
      }
    }
  }
  validate.KeywordCxt = KeywordCxt;
  function keywordCode(it, keyword2, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword2);
    if ("code" in def) {
      def.code(cxt, ruleType);
    } else if (cxt.$data && def.validate) {
      (0, keyword_1.funcKeywordCode)(cxt, def);
    } else if ("macro" in def) {
      (0, keyword_1.macroKeywordCode)(cxt, def);
    } else if (def.compile || def.validate) {
      (0, keyword_1.funcKeywordCode)(cxt, def);
    }
  }
  const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
  const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
      return names_1.default.rootData;
    if ($data[0] === "/") {
      if (!JSON_POINTER.test($data))
        throw new Error(`Invalid JSON-pointer: ${$data}`);
      jsonPointer = $data;
      data = names_1.default.rootData;
    } else {
      const matches = RELATIVE_JSON_POINTER.exec($data);
      if (!matches)
        throw new Error(`Invalid JSON-pointer: ${$data}`);
      const up = +matches[1];
      jsonPointer = matches[2];
      if (jsonPointer === "#") {
        if (up >= dataLevel)
          throw new Error(errorMsg("property/index", up));
        return dataPathArr[dataLevel - up];
      }
      if (up > dataLevel)
        throw new Error(errorMsg("data", up));
      data = dataNames[dataLevel - up];
      if (!jsonPointer)
        return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
      if (segment) {
        data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
        expr = (0, codegen_1._)`${expr} && ${data}`;
      }
    }
    return expr;
    function errorMsg(pointerType, up) {
      return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
  }
  validate.getData = getData;
  return validate;
}
var validation_error = {};
var hasRequiredValidation_error;
function requireValidation_error() {
  if (hasRequiredValidation_error) return validation_error;
  hasRequiredValidation_error = 1;
  Object.defineProperty(validation_error, "__esModule", { value: true });
  class ValidationError extends Error {
    constructor(errors2) {
      super("validation failed");
      this.errors = errors2;
      this.ajv = this.validation = true;
    }
  }
  validation_error.default = ValidationError;
  return validation_error;
}
var ref_error = {};
var hasRequiredRef_error;
function requireRef_error() {
  if (hasRequiredRef_error) return ref_error;
  hasRequiredRef_error = 1;
  Object.defineProperty(ref_error, "__esModule", { value: true });
  const resolve_1 = requireResolve();
  class MissingRefError extends Error {
    constructor(resolver, baseId, ref2, msg) {
      super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
      this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref2);
      this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
  }
  ref_error.default = MissingRefError;
  return ref_error;
}
var compile = {};
var hasRequiredCompile;
function requireCompile() {
  if (hasRequiredCompile) return compile;
  hasRequiredCompile = 1;
  Object.defineProperty(compile, "__esModule", { value: true });
  compile.resolveSchema = compile.getCompilingSchema = compile.resolveRef = compile.compileSchema = compile.SchemaEnv = void 0;
  const codegen_1 = requireCodegen();
  const validation_error_1 = requireValidation_error();
  const names_1 = requireNames();
  const resolve_1 = requireResolve();
  const util_1 = requireUtil();
  const validate_1 = requireValidate();
  class SchemaEnv {
    constructor(env) {
      var _a;
      this.refs = {};
      this.dynamicAnchors = {};
      let schema;
      if (typeof env.schema == "object")
        schema = env.schema;
      this.schema = env.schema;
      this.schemaId = env.schemaId;
      this.root = env.root || this;
      this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
      this.schemaPath = env.schemaPath;
      this.localRefs = env.localRefs;
      this.meta = env.meta;
      this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
      this.refs = {};
    }
  }
  compile.SchemaEnv = SchemaEnv;
  function compileSchema(sch) {
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
      return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
      _ValidationError = gen.scopeValue("Error", {
        ref: validation_error_1.default,
        code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
      });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
      gen,
      allErrors: this.opts.allErrors,
      data: names_1.default.data,
      parentData: names_1.default.parentData,
      parentDataProperty: names_1.default.parentDataProperty,
      dataNames: [names_1.default.data],
      dataPathArr: [codegen_1.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
      validateName,
      ValidationError: _ValidationError,
      schema: sch.schema,
      schemaEnv: sch,
      rootId,
      baseId: sch.baseId || rootId,
      schemaPath: codegen_1.nil,
      errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, codegen_1._)`""`,
      opts: this.opts,
      self: this
    };
    let sourceCode;
    try {
      this._compilations.add(sch);
      (0, validate_1.validateFunctionCode)(schemaCxt);
      gen.optimize(this.opts.code.optimize);
      const validateCode = gen.toString();
      sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
      if (this.opts.code.process)
        sourceCode = this.opts.code.process(sourceCode, sch);
      const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
      const validate2 = makeValidate(this, this.scope.get());
      this.scope.value(validateName, { ref: validate2 });
      validate2.errors = null;
      validate2.schema = sch.schema;
      validate2.schemaEnv = sch;
      if (sch.$async)
        validate2.$async = true;
      if (this.opts.code.source === true) {
        validate2.source = { validateName, validateCode, scopeValues: gen._values };
      }
      if (this.opts.unevaluated) {
        const { props, items: items2 } = schemaCxt;
        validate2.evaluated = {
          props: props instanceof codegen_1.Name ? void 0 : props,
          items: items2 instanceof codegen_1.Name ? void 0 : items2,
          dynamicProps: props instanceof codegen_1.Name,
          dynamicItems: items2 instanceof codegen_1.Name
        };
        if (validate2.source)
          validate2.source.evaluated = (0, codegen_1.stringify)(validate2.evaluated);
      }
      sch.validate = validate2;
      return sch;
    } catch (e) {
      delete sch.validate;
      delete sch.validateName;
      if (sourceCode)
        this.logger.error("Error compiling schema, function code:", sourceCode);
      throw e;
    } finally {
      this._compilations.delete(sch);
    }
  }
  compile.compileSchema = compileSchema;
  function resolveRef(root, baseId, ref2) {
    var _a;
    ref2 = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref2);
    const schOrFunc = root.refs[ref2];
    if (schOrFunc)
      return schOrFunc;
    let _sch = resolve2.call(this, root, ref2);
    if (_sch === void 0) {
      const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
      const { schemaId } = this.opts;
      if (schema)
        _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === void 0)
      return;
    return root.refs[ref2] = inlineOrCompile.call(this, _sch);
  }
  compile.resolveRef = resolveRef;
  function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
      return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
  }
  function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
      if (sameSchemaEnv(sch, schEnv))
        return sch;
    }
  }
  compile.getCompilingSchema = getCompilingSchema;
  function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
  }
  function resolve2(root, ref2) {
    let sch;
    while (typeof (sch = this.refs[ref2]) == "string")
      ref2 = sch;
    return sch || this.schemas[ref2] || resolveSchema.call(this, root, ref2);
  }
  function resolveSchema(root, ref2) {
    const p = this.opts.uriResolver.parse(ref2);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
      return getJsonPointer.call(this, p, root);
    }
    const id2 = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id2] || this.schemas[id2];
    if (typeof schOrRef == "string") {
      const sch = resolveSchema.call(this, root, schOrRef);
      if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
        return;
      return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
      return;
    if (!schOrRef.validate)
      compileSchema.call(this, schOrRef);
    if (id2 === (0, resolve_1.normalizeId)(ref2)) {
      const { schema } = schOrRef;
      const { schemaId } = this.opts;
      const schId = schema[schemaId];
      if (schId)
        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
      return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
  }
  compile.resolveSchema = resolveSchema;
  const PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
      return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
      if (typeof schema === "boolean")
        return;
      const partSchema = schema[(0, util_1.unescapeFragment)(part)];
      if (partSchema === void 0)
        return;
      schema = partSchema;
      const schId = typeof schema === "object" && schema[this.opts.schemaId];
      if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
        baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
      }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
      const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
      env = resolveSchema.call(this, root, $ref);
    }
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
      return env;
    return void 0;
  }
  return compile;
}
const $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
const type$1 = "object";
const required$1 = ["$data"];
const properties$2 = { "$data": { "type": "string", "anyOf": [{ "format": "relative-json-pointer" }, { "format": "json-pointer" }] } };
const additionalProperties$1 = false;
const require$$9 = {
  $id: $id$1,
  description,
  type: type$1,
  required: required$1,
  properties: properties$2,
  additionalProperties: additionalProperties$1
};
var uri = {};
var hasRequiredUri;
function requireUri() {
  if (hasRequiredUri) return uri;
  hasRequiredUri = 1;
  Object.defineProperty(uri, "__esModule", { value: true });
  const uri$12 = requireFastUri();
  uri$12.code = 'require("ajv/dist/runtime/uri").default';
  uri.default = uri$12;
  return uri;
}
var hasRequiredCore$1;
function requireCore$1() {
  if (hasRequiredCore$1) return core$1;
  hasRequiredCore$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = requireValidate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = requireCodegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    const validation_error_1 = requireValidation_error();
    const ref_error_1 = requireRef_error();
    const rules_1 = requireRules();
    const compile_1 = requireCompile();
    const codegen_2 = requireCodegen();
    const resolve_1 = requireResolve();
    const dataType_1 = requireDataType();
    const util_1 = requireUtil();
    const $dataRefSchema = require$$9;
    const uri_1 = requireUri();
    const defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    const EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    const removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    const deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    const MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    class Ajv {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid2 = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid2;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref2, missingRef }) {
          if (this.refs[ref2]) {
            throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref2) {
          const _schema = await _loadSchema.call(this, ref2);
          if (!this.refs[ref2])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref2])
            this.addSchema(_schema, ref2, meta);
        }
        async function _loadSchema(ref2) {
          const p = this._loading[ref2];
          if (p)
            return p;
          try {
            return await (this._loading[ref2] = loadSchema(ref2));
          } finally {
            delete this._loading[ref2];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id2;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id2 = schema[schemaId];
          if (id2 !== void 0 && typeof id2 != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id2);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema2;
        $schema2 = schema.$schema;
        if ($schema2 !== void 0 && typeof $schema2 != "string") {
          throw new Error("$schema must be a string");
        }
        $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema2) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid2 = this.validate($schema2, schema);
        if (!valid2 && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid2;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id2 = schemaKeyRef[this.opts.schemaId];
            if (id2) {
              id2 = (0, resolve_1.normalizeId)(id2);
              delete this.schemas[id2];
              delete this.refs[id2];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions2) {
        for (const def of definitions2)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword2;
        if (typeof kwdOrDef == "string") {
          keyword2 = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword2;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword2 = def.keyword;
          if (Array.isArray(keyword2) && !keyword2.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword2, def);
        if (!def) {
          (0, util_1.eachItem)(keyword2, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword2) {
        const rule = this.RULES.all[keyword2];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword2) {
        const { RULES } = this;
        delete RULES.keywords[keyword2];
        delete RULES.all[keyword2];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword2);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format2) {
        if (typeof format2 == "string")
          format2 = new RegExp(format2);
        this.formats[name] = format2;
        return this;
      }
      errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors2 || errors2.length === 0)
          return "No errors";
        return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules2 = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules2) {
            const rule = rules2[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id2;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id2 = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id2 || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id2) {
        if (this.schemas[id2] || this.refs[id2]) {
          throw new Error(`schema with key or id "${id2}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    }
    Ajv.ValidationError = validation_error_1.default;
    Ajv.MissingRefError = ref_error_1.default;
    exports.default = Ajv;
    function checkOptions(checkOpts, options, msg, log2 = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log2](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format2 = this.opts.formats[name];
        if (format2)
          this.addFormat(name, format2);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword2 in defs) {
        const def = defs[keyword2];
        if (!def.keyword)
          def.keyword = keyword2;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    const noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword2, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword2, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword2, definition, dataType2) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType2 && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType2);
      if (!ruleGroup) {
        ruleGroup = { type: dataType2, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword2] = true;
      if (!definition)
        return;
      const rule = {
        keyword: keyword2,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword2] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    const $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  })(core$1);
  return core$1;
}
var draft7 = {};
var core = {};
var id = {};
var hasRequiredId;
function requireId() {
  if (hasRequiredId) return id;
  hasRequiredId = 1;
  Object.defineProperty(id, "__esModule", { value: true });
  const def = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  id.default = def;
  return id;
}
var ref = {};
var hasRequiredRef;
function requireRef() {
  if (hasRequiredRef) return ref;
  hasRequiredRef = 1;
  Object.defineProperty(ref, "__esModule", { value: true });
  ref.callRef = ref.getValidate = void 0;
  const ref_error_1 = requireRef_error();
  const code_1 = requireCode();
  const codegen_1 = requireCodegen();
  const names_1 = requireNames();
  const compile_1 = requireCompile();
  const util_1 = requireUtil();
  const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
      const { gen, schema: $ref, it } = cxt;
      const { baseId, schemaEnv: env, validateName, opts, self } = it;
      const { root } = env;
      if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
        return callRootRef();
      const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
      if (schOrEnv === void 0)
        throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
      if (schOrEnv instanceof compile_1.SchemaEnv)
        return callValidate(schOrEnv);
      return inlineRefSchema(schOrEnv);
      function callRootRef() {
        if (env === root)
          return callRef(cxt, validateName, env, env.$async);
        const rootName = gen.scopeValue("root", { ref: root });
        return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
      }
      function callValidate(sch) {
        const v = getValidate(cxt, sch);
        callRef(cxt, v, sch, sch.$async);
      }
      function inlineRefSchema(sch) {
        const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
        const valid2 = gen.name("valid");
        const schCxt = cxt.subschema({
          schema: sch,
          dataTypes: [],
          schemaPath: codegen_1.nil,
          topSchemaRef: schName,
          errSchemaPath: $ref
        }, valid2);
        cxt.mergeEvaluated(schCxt);
        cxt.ok(valid2);
      }
    }
  };
  function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
  }
  ref.getValidate = getValidate;
  function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
      callAsyncRef();
    else
      callSyncRef();
    function callAsyncRef() {
      if (!env.$async)
        throw new Error("async schema referenced by sync schema");
      const valid2 = gen.let("valid");
      gen.try(() => {
        gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
        addEvaluatedFrom(v);
        if (!allErrors)
          gen.assign(valid2, true);
      }, (e) => {
        gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
        addErrorsFrom(e);
        if (!allErrors)
          gen.assign(valid2, false);
      });
      cxt.ok(valid2);
    }
    function callSyncRef() {
      cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source2) {
      const errs = (0, codegen_1._)`${source2}.errors`;
      gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
      gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source2) {
      var _a;
      if (!it.opts.unevaluated)
        return;
      const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
      if (it.props !== true) {
        if (schEvaluated && !schEvaluated.dynamicProps) {
          if (schEvaluated.props !== void 0) {
            it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
          }
        } else {
          const props = gen.var("props", (0, codegen_1._)`${source2}.evaluated.props`);
          it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
        }
      }
      if (it.items !== true) {
        if (schEvaluated && !schEvaluated.dynamicItems) {
          if (schEvaluated.items !== void 0) {
            it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
          }
        } else {
          const items2 = gen.var("items", (0, codegen_1._)`${source2}.evaluated.items`);
          it.items = util_1.mergeEvaluated.items(gen, items2, it.items, codegen_1.Name);
        }
      }
    }
  }
  ref.callRef = callRef;
  ref.default = def;
  return ref;
}
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core;
  hasRequiredCore = 1;
  Object.defineProperty(core, "__esModule", { value: true });
  const id_1 = requireId();
  const ref_1 = requireRef();
  const core$12 = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default
  ];
  core.default = core$12;
  return core;
}
var validation = {};
var limitNumber = {};
var hasRequiredLimitNumber;
function requireLimitNumber() {
  if (hasRequiredLimitNumber) return limitNumber;
  hasRequiredLimitNumber = 1;
  Object.defineProperty(limitNumber, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const ops = codegen_1.operators;
  const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
  };
  const error = {
    message: ({ keyword: keyword2, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword2].okStr} ${schemaCode}`,
    params: ({ keyword: keyword2, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
  };
  const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword2].fail} ${schemaCode} || isNaN(${data})`);
    }
  };
  limitNumber.default = def;
  return limitNumber;
}
var multipleOf = {};
var hasRequiredMultipleOf;
function requireMultipleOf() {
  if (hasRequiredMultipleOf) return multipleOf;
  hasRequiredMultipleOf = 1;
  Object.defineProperty(multipleOf, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const error = {
    message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
  };
  const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, schemaCode, it } = cxt;
      const prec = it.opts.multipleOfPrecision;
      const res = gen.let("res");
      const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
      cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    }
  };
  multipleOf.default = def;
  return multipleOf;
}
var limitLength = {};
var ucs2length = {};
var hasRequiredUcs2length;
function requireUcs2length() {
  if (hasRequiredUcs2length) return ucs2length;
  hasRequiredUcs2length = 1;
  Object.defineProperty(ucs2length, "__esModule", { value: true });
  function ucs2length$12(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 55296 && value <= 56319 && pos < len) {
        value = str.charCodeAt(pos);
        if ((value & 64512) === 56320)
          pos++;
      }
    }
    return length;
  }
  ucs2length.default = ucs2length$12;
  ucs2length$12.code = 'require("ajv/dist/runtime/ucs2length").default';
  return ucs2length;
}
var hasRequiredLimitLength;
function requireLimitLength() {
  if (hasRequiredLimitLength) return limitLength;
  hasRequiredLimitLength = 1;
  Object.defineProperty(limitLength, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const ucs2length_1 = requireUcs2length();
  const error = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxLength" ? "more" : "fewer";
      return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
  };
  const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode, it } = cxt;
      const op = keyword2 === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
      const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
      cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
    }
  };
  limitLength.default = def;
  return limitLength;
}
var pattern = {};
var hasRequiredPattern;
function requirePattern() {
  if (hasRequiredPattern) return pattern;
  hasRequiredPattern = 1;
  Object.defineProperty(pattern, "__esModule", { value: true });
  const code_1 = requireCode();
  const codegen_1 = requireCodegen();
  const error = {
    message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
  };
  const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
      const { data, $data, schema, schemaCode, it } = cxt;
      const u = it.opts.unicodeRegExp ? "u" : "";
      const regExp = $data ? (0, codegen_1._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
      cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
    }
  };
  pattern.default = def;
  return pattern;
}
var limitProperties = {};
var hasRequiredLimitProperties;
function requireLimitProperties() {
  if (hasRequiredLimitProperties) return limitProperties;
  hasRequiredLimitProperties = 1;
  Object.defineProperty(limitProperties, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const error = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxProperties" ? "more" : "fewer";
      return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
  };
  const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      const op = keyword2 === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
      cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
    }
  };
  limitProperties.default = def;
  return limitProperties;
}
var required = {};
var hasRequiredRequired;
function requireRequired() {
  if (hasRequiredRequired) return required;
  hasRequiredRequired = 1;
  Object.defineProperty(required, "__esModule", { value: true });
  const code_1 = requireCode();
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
  };
  const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
      const { gen, schema, schemaCode, data, $data, it } = cxt;
      const { opts } = it;
      if (!$data && schema.length === 0)
        return;
      const useLoop = schema.length >= opts.loopRequired;
      if (it.allErrors)
        allErrorsMode();
      else
        exitOnErrorMode();
      if (opts.strictRequired) {
        const props = cxt.parentSchema.properties;
        const { definedProperties } = cxt.it;
        for (const requiredKey of schema) {
          if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
            const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
            const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
            (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
          }
        }
      }
      function allErrorsMode() {
        if (useLoop || $data) {
          cxt.block$data(codegen_1.nil, loopAllRequired);
        } else {
          for (const prop of schema) {
            (0, code_1.checkReportMissingProp)(cxt, prop);
          }
        }
      }
      function exitOnErrorMode() {
        const missing = gen.let("missing");
        if (useLoop || $data) {
          const valid2 = gen.let("valid", true);
          cxt.block$data(valid2, () => loopUntilMissing(missing, valid2));
          cxt.ok(valid2);
        } else {
          gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
      function loopAllRequired() {
        gen.forOf("prop", schemaCode, (prop) => {
          cxt.setParams({ missingProperty: prop });
          gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
        });
      }
      function loopUntilMissing(missing, valid2) {
        cxt.setParams({ missingProperty: missing });
        gen.forOf(missing, schemaCode, () => {
          gen.assign(valid2, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
          gen.if((0, codegen_1.not)(valid2), () => {
            cxt.error();
            gen.break();
          });
        }, codegen_1.nil);
      }
    }
  };
  required.default = def;
  return required;
}
var limitItems = {};
var hasRequiredLimitItems;
function requireLimitItems() {
  if (hasRequiredLimitItems) return limitItems;
  hasRequiredLimitItems = 1;
  Object.defineProperty(limitItems, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const error = {
    message({ keyword: keyword2, schemaCode }) {
      const comp = keyword2 === "maxItems" ? "more" : "fewer";
      return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
  };
  const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
      const { keyword: keyword2, data, schemaCode } = cxt;
      const op = keyword2 === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
      cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
    }
  };
  limitItems.default = def;
  return limitItems;
}
var uniqueItems = {};
var equal = {};
var hasRequiredEqual;
function requireEqual() {
  if (hasRequiredEqual) return equal;
  hasRequiredEqual = 1;
  Object.defineProperty(equal, "__esModule", { value: true });
  const equal$12 = requireFastDeepEqual();
  equal$12.code = 'require("ajv/dist/runtime/equal").default';
  equal.default = equal$12;
  return equal;
}
var hasRequiredUniqueItems;
function requireUniqueItems() {
  if (hasRequiredUniqueItems) return uniqueItems;
  hasRequiredUniqueItems = 1;
  Object.defineProperty(uniqueItems, "__esModule", { value: true });
  const dataType_1 = requireDataType();
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const equal_1 = requireEqual();
  const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
  };
  const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
      if (!$data && !schema)
        return;
      const valid2 = gen.let("valid");
      const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
      cxt.block$data(valid2, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
      cxt.ok(valid2);
      function validateUniqueItems() {
        const i = gen.let("i", (0, codegen_1._)`${data}.length`);
        const j = gen.let("j");
        cxt.setParams({ i, j });
        gen.assign(valid2, true);
        gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
      }
      function canOptimize() {
        return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
      }
      function loopN(i, j) {
        const item = gen.name("item");
        const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
        const indices = gen.const("indices", (0, codegen_1._)`{}`);
        gen.for((0, codegen_1._)`;${i}--;`, () => {
          gen.let(item, (0, codegen_1._)`${data}[${i}]`);
          gen.if(wrongType, (0, codegen_1._)`continue`);
          if (itemTypes.length > 1)
            gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
          gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
            gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
            cxt.error();
            gen.assign(valid2, false).break();
          }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
        });
      }
      function loopN2(i, j) {
        const eql = (0, util_1.useFunc)(gen, equal_1.default);
        const outer = gen.name("outer");
        gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
          cxt.error();
          gen.assign(valid2, false).break(outer);
        })));
      }
    }
  };
  uniqueItems.default = def;
  return uniqueItems;
}
var _const = {};
var hasRequired_const;
function require_const() {
  if (hasRequired_const) return _const;
  hasRequired_const = 1;
  Object.defineProperty(_const, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const equal_1 = requireEqual();
  const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
  };
  const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, $data, schemaCode, schema } = cxt;
      if ($data || schema && typeof schema == "object") {
        cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
      } else {
        cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
      }
    }
  };
  _const.default = def;
  return _const;
}
var _enum = {};
var hasRequired_enum;
function require_enum() {
  if (hasRequired_enum) return _enum;
  hasRequired_enum = 1;
  Object.defineProperty(_enum, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const equal_1 = requireEqual();
  const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
  };
  const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
      const { gen, data, $data, schema, schemaCode, it } = cxt;
      if (!$data && schema.length === 0)
        throw new Error("enum must have non-empty array");
      const useLoop = schema.length >= it.opts.loopEnum;
      let eql;
      const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
      let valid2;
      if (useLoop || $data) {
        valid2 = gen.let("valid");
        cxt.block$data(valid2, loopEnum);
      } else {
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const vSchema = gen.const("vSchema", schemaCode);
        valid2 = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
      }
      cxt.pass(valid2);
      function loopEnum() {
        gen.assign(valid2, false);
        gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid2, true).break()));
      }
      function equalCode(vSchema, i) {
        const sch = schema[i];
        return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
      }
    }
  };
  _enum.default = def;
  return _enum;
}
var hasRequiredValidation;
function requireValidation() {
  if (hasRequiredValidation) return validation;
  hasRequiredValidation = 1;
  Object.defineProperty(validation, "__esModule", { value: true });
  const limitNumber_1 = requireLimitNumber();
  const multipleOf_1 = requireMultipleOf();
  const limitLength_1 = requireLimitLength();
  const pattern_1 = requirePattern();
  const limitProperties_1 = requireLimitProperties();
  const required_1 = requireRequired();
  const limitItems_1 = requireLimitItems();
  const uniqueItems_1 = requireUniqueItems();
  const const_1 = require_const();
  const enum_1 = require_enum();
  const validation$12 = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default
  ];
  validation.default = validation$12;
  return validation;
}
var applicator = {};
var additionalItems = {};
var hasRequiredAdditionalItems;
function requireAdditionalItems() {
  if (hasRequiredAdditionalItems) return additionalItems;
  hasRequiredAdditionalItems = 1;
  Object.defineProperty(additionalItems, "__esModule", { value: true });
  additionalItems.validateAdditionalItems = void 0;
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const error = {
    message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
  };
  const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
      const { parentSchema, it } = cxt;
      const { items: items2 } = parentSchema;
      if (!Array.isArray(items2)) {
        (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      validateAdditionalItems(cxt, items2);
    }
  };
  function validateAdditionalItems(cxt, items2) {
    const { gen, schema, data, keyword: keyword2, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._)`${data}.length`);
    if (schema === false) {
      cxt.setParams({ len: items2.length });
      cxt.pass((0, codegen_1._)`${len} <= ${items2.length}`);
    } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
      const valid2 = gen.var("valid", (0, codegen_1._)`${len} <= ${items2.length}`);
      gen.if((0, codegen_1.not)(valid2), () => validateItems(valid2));
      cxt.ok(valid2);
    }
    function validateItems(valid2) {
      gen.forRange("i", items2.length, len, (i) => {
        cxt.subschema({ keyword: keyword2, dataProp: i, dataPropType: util_1.Type.Num }, valid2);
        if (!it.allErrors)
          gen.if((0, codegen_1.not)(valid2), () => gen.break());
      });
    }
  }
  additionalItems.validateAdditionalItems = validateAdditionalItems;
  additionalItems.default = def;
  return additionalItems;
}
var prefixItems = {};
var items = {};
var hasRequiredItems;
function requireItems() {
  if (hasRequiredItems) return items;
  hasRequiredItems = 1;
  Object.defineProperty(items, "__esModule", { value: true });
  items.validateTuple = void 0;
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const code_1 = requireCode();
  const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
      const { schema, it } = cxt;
      if (Array.isArray(schema))
        return validateTuple(cxt, "additionalItems", schema);
      it.items = true;
      if ((0, util_1.alwaysValidSchema)(it, schema))
        return;
      cxt.ok((0, code_1.validateArray)(cxt));
    }
  };
  function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
      it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid2 = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._)`${data}.length`);
    schArr.forEach((sch, i) => {
      if ((0, util_1.alwaysValidSchema)(it, sch))
        return;
      gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
        keyword: keyword2,
        schemaProp: i,
        dataProp: i
      }, valid2));
      cxt.ok(valid2);
    });
    function checkStrictTuple(sch) {
      const { opts, errSchemaPath } = it;
      const l = schArr.length;
      const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
      if (opts.strictTuples && !fullTuple) {
        const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
        (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
      }
    }
  }
  items.validateTuple = validateTuple;
  items.default = def;
  return items;
}
var hasRequiredPrefixItems;
function requirePrefixItems() {
  if (hasRequiredPrefixItems) return prefixItems;
  hasRequiredPrefixItems = 1;
  Object.defineProperty(prefixItems, "__esModule", { value: true });
  const items_1 = requireItems();
  const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
  };
  prefixItems.default = def;
  return prefixItems;
}
var items2020 = {};
var hasRequiredItems2020;
function requireItems2020() {
  if (hasRequiredItems2020) return items2020;
  hasRequiredItems2020 = 1;
  Object.defineProperty(items2020, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const code_1 = requireCode();
  const additionalItems_1 = requireAdditionalItems();
  const error = {
    message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
  };
  const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
      const { schema, parentSchema, it } = cxt;
      const { prefixItems: prefixItems2 } = parentSchema;
      it.items = true;
      if ((0, util_1.alwaysValidSchema)(it, schema))
        return;
      if (prefixItems2)
        (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems2);
      else
        cxt.ok((0, code_1.validateArray)(cxt));
    }
  };
  items2020.default = def;
  return items2020;
}
var contains = {};
var hasRequiredContains;
function requireContains() {
  if (hasRequiredContains) return contains;
  hasRequiredContains = 1;
  Object.defineProperty(contains, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const error = {
    message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
  };
  const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, schema, parentSchema, data, it } = cxt;
      let min;
      let max;
      const { minContains, maxContains } = parentSchema;
      if (it.opts.next) {
        min = minContains === void 0 ? 1 : minContains;
        max = maxContains;
      } else {
        min = 1;
      }
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      cxt.setParams({ min, max });
      if (max === void 0 && min === 0) {
        (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
        return;
      }
      if (max !== void 0 && min > max) {
        (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
        cxt.fail();
        return;
      }
      if ((0, util_1.alwaysValidSchema)(it, schema)) {
        let cond = (0, codegen_1._)`${len} >= ${min}`;
        if (max !== void 0)
          cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
        cxt.pass(cond);
        return;
      }
      it.items = true;
      const valid2 = gen.name("valid");
      if (max === void 0 && min === 1) {
        validateItems(valid2, () => gen.if(valid2, () => gen.break()));
      } else if (min === 0) {
        gen.let(valid2, true);
        if (max !== void 0)
          gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
      } else {
        gen.let(valid2, false);
        validateItemsWithCount();
      }
      cxt.result(valid2, () => cxt.reset());
      function validateItemsWithCount() {
        const schValid = gen.name("_valid");
        const count = gen.let("count", 0);
        validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
      }
      function validateItems(_valid, block) {
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword: "contains",
            dataProp: i,
            dataPropType: util_1.Type.Num,
            compositeRule: true
          }, _valid);
          block();
        });
      }
      function checkLimits(count) {
        gen.code((0, codegen_1._)`${count}++`);
        if (max === void 0) {
          gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid2, true).break());
        } else {
          gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid2, false).break());
          if (min === 1)
            gen.assign(valid2, true);
          else
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid2, true));
        }
      }
    }
  };
  contains.default = def;
  return contains;
}
var dependencies = {};
var hasRequiredDependencies;
function requireDependencies() {
  if (hasRequiredDependencies) return dependencies;
  hasRequiredDependencies = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    const codegen_1 = requireCodegen();
    const util_1 = requireUtil();
    const code_1 = requireCode();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    const def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword: keyword2, it } = cxt;
      const valid2 = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid2);
            cxt.mergeValidEvaluated(schCxt, valid2);
          },
          () => gen.var(valid2, true)
          // TODO var
        );
        cxt.ok(valid2);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  })(dependencies);
  return dependencies;
}
var propertyNames = {};
var hasRequiredPropertyNames;
function requirePropertyNames() {
  if (hasRequiredPropertyNames) return propertyNames;
  hasRequiredPropertyNames = 1;
  Object.defineProperty(propertyNames, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
  };
  const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
      const { gen, schema, data, it } = cxt;
      if ((0, util_1.alwaysValidSchema)(it, schema))
        return;
      const valid2 = gen.name("valid");
      gen.forIn("key", data, (key) => {
        cxt.setParams({ propertyName: key });
        cxt.subschema({
          keyword: "propertyNames",
          data: key,
          dataTypes: ["string"],
          propertyName: key,
          compositeRule: true
        }, valid2);
        gen.if((0, codegen_1.not)(valid2), () => {
          cxt.error(true);
          if (!it.allErrors)
            gen.break();
        });
      });
      cxt.ok(valid2);
    }
  };
  propertyNames.default = def;
  return propertyNames;
}
var additionalProperties = {};
var hasRequiredAdditionalProperties;
function requireAdditionalProperties() {
  if (hasRequiredAdditionalProperties) return additionalProperties;
  hasRequiredAdditionalProperties = 1;
  Object.defineProperty(additionalProperties, "__esModule", { value: true });
  const code_1 = requireCode();
  const codegen_1 = requireCodegen();
  const names_1 = requireNames();
  const util_1 = requireUtil();
  const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
  };
  const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, schema, parentSchema, data, errsCount, it } = cxt;
      if (!errsCount)
        throw new Error("ajv implementation error");
      const { allErrors, opts } = it;
      it.props = true;
      if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
        return;
      const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
      const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
      checkAdditionalProperties();
      cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
      function checkAdditionalProperties() {
        gen.forIn("key", data, (key) => {
          if (!props.length && !patProps.length)
            additionalPropertyCode(key);
          else
            gen.if(isAdditional(key), () => additionalPropertyCode(key));
        });
      }
      function isAdditional(key) {
        let definedProp;
        if (props.length > 8) {
          const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
          definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
        } else if (props.length) {
          definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
        } else {
          definedProp = codegen_1.nil;
        }
        if (patProps.length) {
          definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
        }
        return (0, codegen_1.not)(definedProp);
      }
      function deleteAdditional(key) {
        gen.code((0, codegen_1._)`delete ${data}[${key}]`);
      }
      function additionalPropertyCode(key) {
        if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
          deleteAdditional(key);
          return;
        }
        if (schema === false) {
          cxt.setParams({ additionalProperty: key });
          cxt.error();
          if (!allErrors)
            gen.break();
          return;
        }
        if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
          const valid2 = gen.name("valid");
          if (opts.removeAdditional === "failing") {
            applyAdditionalSchema(key, valid2, false);
            gen.if((0, codegen_1.not)(valid2), () => {
              cxt.reset();
              deleteAdditional(key);
            });
          } else {
            applyAdditionalSchema(key, valid2);
            if (!allErrors)
              gen.if((0, codegen_1.not)(valid2), () => gen.break());
          }
        }
      }
      function applyAdditionalSchema(key, valid2, errors2) {
        const subschema2 = {
          keyword: "additionalProperties",
          dataProp: key,
          dataPropType: util_1.Type.Str
        };
        if (errors2 === false) {
          Object.assign(subschema2, {
            compositeRule: true,
            createErrors: false,
            allErrors: false
          });
        }
        cxt.subschema(subschema2, valid2);
      }
    }
  };
  additionalProperties.default = def;
  return additionalProperties;
}
var properties$1 = {};
var hasRequiredProperties;
function requireProperties() {
  if (hasRequiredProperties) return properties$1;
  hasRequiredProperties = 1;
  Object.defineProperty(properties$1, "__esModule", { value: true });
  const validate_1 = requireValidate();
  const code_1 = requireCode();
  const util_1 = requireUtil();
  const additionalProperties_1 = requireAdditionalProperties();
  const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
      const { gen, schema, parentSchema, data, it } = cxt;
      if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
        additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
      }
      const allProps = (0, code_1.allSchemaProperties)(schema);
      for (const prop of allProps) {
        it.definedProperties.add(prop);
      }
      if (it.opts.unevaluated && allProps.length && it.props !== true) {
        it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
      }
      const properties2 = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
      if (properties2.length === 0)
        return;
      const valid2 = gen.name("valid");
      for (const prop of properties2) {
        if (hasDefault(prop)) {
          applyPropertySchema(prop);
        } else {
          gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
          applyPropertySchema(prop);
          if (!it.allErrors)
            gen.else().var(valid2, true);
          gen.endIf();
        }
        cxt.it.definedProperties.add(prop);
        cxt.ok(valid2);
      }
      function hasDefault(prop) {
        return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
      }
      function applyPropertySchema(prop) {
        cxt.subschema({
          keyword: "properties",
          schemaProp: prop,
          dataProp: prop
        }, valid2);
      }
    }
  };
  properties$1.default = def;
  return properties$1;
}
var patternProperties = {};
var hasRequiredPatternProperties;
function requirePatternProperties() {
  if (hasRequiredPatternProperties) return patternProperties;
  hasRequiredPatternProperties = 1;
  Object.defineProperty(patternProperties, "__esModule", { value: true });
  const code_1 = requireCode();
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const util_2 = requireUtil();
  const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
      const { gen, schema, data, parentSchema, it } = cxt;
      const { opts } = it;
      const patterns = (0, code_1.allSchemaProperties)(schema);
      const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
      if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
        return;
      }
      const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
      const valid2 = gen.name("valid");
      if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
        it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
      }
      const { props } = it;
      validatePatternProperties();
      function validatePatternProperties() {
        for (const pat of patterns) {
          if (checkProperties)
            checkMatchingProperties(pat);
          if (it.allErrors) {
            validateProperties(pat);
          } else {
            gen.var(valid2, true);
            validateProperties(pat);
            gen.if(valid2);
          }
        }
      }
      function checkMatchingProperties(pat) {
        for (const prop in checkProperties) {
          if (new RegExp(pat).test(prop)) {
            (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
          }
        }
      }
      function validateProperties(pat) {
        gen.forIn("key", data, (key) => {
          gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
            const alwaysValid = alwaysValidPatterns.includes(pat);
            if (!alwaysValid) {
              cxt.subschema({
                keyword: "patternProperties",
                schemaProp: pat,
                dataProp: key,
                dataPropType: util_2.Type.Str
              }, valid2);
            }
            if (it.opts.unevaluated && props !== true) {
              gen.assign((0, codegen_1._)`${props}[${key}]`, true);
            } else if (!alwaysValid && !it.allErrors) {
              gen.if((0, codegen_1.not)(valid2), () => gen.break());
            }
          });
        });
      }
    }
  };
  patternProperties.default = def;
  return patternProperties;
}
var not = {};
var hasRequiredNot;
function requireNot() {
  if (hasRequiredNot) return not;
  hasRequiredNot = 1;
  Object.defineProperty(not, "__esModule", { value: true });
  const util_1 = requireUtil();
  const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
      const { gen, schema, it } = cxt;
      if ((0, util_1.alwaysValidSchema)(it, schema)) {
        cxt.fail();
        return;
      }
      const valid2 = gen.name("valid");
      cxt.subschema({
        keyword: "not",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, valid2);
      cxt.failResult(valid2, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" }
  };
  not.default = def;
  return not;
}
var anyOf = {};
var hasRequiredAnyOf;
function requireAnyOf() {
  if (hasRequiredAnyOf) return anyOf;
  hasRequiredAnyOf = 1;
  Object.defineProperty(anyOf, "__esModule", { value: true });
  const code_1 = requireCode();
  const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  anyOf.default = def;
  return anyOf;
}
var oneOf = {};
var hasRequiredOneOf;
function requireOneOf() {
  if (hasRequiredOneOf) return oneOf;
  hasRequiredOneOf = 1;
  Object.defineProperty(oneOf, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
  };
  const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, schema, parentSchema, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      if (it.opts.discriminator && parentSchema.discriminator)
        return;
      const schArr = schema;
      const valid2 = gen.let("valid", false);
      const passing = gen.let("passing", null);
      const schValid = gen.name("_valid");
      cxt.setParams({ passing });
      gen.block(validateOneOf);
      cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
      function validateOneOf() {
        schArr.forEach((sch, i) => {
          let schCxt;
          if ((0, util_1.alwaysValidSchema)(it, sch)) {
            gen.var(schValid, true);
          } else {
            schCxt = cxt.subschema({
              keyword: "oneOf",
              schemaProp: i,
              compositeRule: true
            }, schValid);
          }
          if (i > 0) {
            gen.if((0, codegen_1._)`${schValid} && ${valid2}`).assign(valid2, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
          }
          gen.if(schValid, () => {
            gen.assign(valid2, true);
            gen.assign(passing, i);
            if (schCxt)
              cxt.mergeEvaluated(schCxt, codegen_1.Name);
          });
        });
      }
    }
  };
  oneOf.default = def;
  return oneOf;
}
var allOf = {};
var hasRequiredAllOf;
function requireAllOf() {
  if (hasRequiredAllOf) return allOf;
  hasRequiredAllOf = 1;
  Object.defineProperty(allOf, "__esModule", { value: true });
  const util_1 = requireUtil();
  const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
      const { gen, schema, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const valid2 = gen.name("valid");
      schema.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid2);
        cxt.ok(valid2);
        cxt.mergeEvaluated(schCxt);
      });
    }
  };
  allOf.default = def;
  return allOf;
}
var _if = {};
var hasRequired_if;
function require_if() {
  if (hasRequired_if) return _if;
  hasRequired_if = 1;
  Object.defineProperty(_if, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const util_1 = requireUtil();
  const error = {
    message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
  };
  const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
      const { gen, parentSchema, it } = cxt;
      if (parentSchema.then === void 0 && parentSchema.else === void 0) {
        (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
      }
      const hasThen = hasSchema(it, "then");
      const hasElse = hasSchema(it, "else");
      if (!hasThen && !hasElse)
        return;
      const valid2 = gen.let("valid", true);
      const schValid = gen.name("_valid");
      validateIf();
      cxt.reset();
      if (hasThen && hasElse) {
        const ifClause = gen.let("ifClause");
        cxt.setParams({ ifClause });
        gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
      } else if (hasThen) {
        gen.if(schValid, validateClause("then"));
      } else {
        gen.if((0, codegen_1.not)(schValid), validateClause("else"));
      }
      cxt.pass(valid2, () => cxt.error(true));
      function validateIf() {
        const schCxt = cxt.subschema({
          keyword: "if",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, schValid);
        cxt.mergeEvaluated(schCxt);
      }
      function validateClause(keyword2, ifClause) {
        return () => {
          const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
          gen.assign(valid2, schValid);
          cxt.mergeValidEvaluated(schCxt, valid2);
          if (ifClause)
            gen.assign(ifClause, (0, codegen_1._)`${keyword2}`);
          else
            cxt.setParams({ ifClause: keyword2 });
        };
      }
    }
  };
  function hasSchema(it, keyword2) {
    const schema = it.schema[keyword2];
    return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
  }
  _if.default = def;
  return _if;
}
var thenElse = {};
var hasRequiredThenElse;
function requireThenElse() {
  if (hasRequiredThenElse) return thenElse;
  hasRequiredThenElse = 1;
  Object.defineProperty(thenElse, "__esModule", { value: true });
  const util_1 = requireUtil();
  const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: keyword2, parentSchema, it }) {
      if (parentSchema.if === void 0)
        (0, util_1.checkStrictMode)(it, `"${keyword2}" without "if" is ignored`);
    }
  };
  thenElse.default = def;
  return thenElse;
}
var hasRequiredApplicator;
function requireApplicator() {
  if (hasRequiredApplicator) return applicator;
  hasRequiredApplicator = 1;
  Object.defineProperty(applicator, "__esModule", { value: true });
  const additionalItems_1 = requireAdditionalItems();
  const prefixItems_1 = requirePrefixItems();
  const items_1 = requireItems();
  const items2020_1 = requireItems2020();
  const contains_1 = requireContains();
  const dependencies_1 = requireDependencies();
  const propertyNames_1 = requirePropertyNames();
  const additionalProperties_1 = requireAdditionalProperties();
  const properties_1 = requireProperties();
  const patternProperties_1 = requirePatternProperties();
  const not_1 = requireNot();
  const anyOf_1 = requireAnyOf();
  const oneOf_1 = requireOneOf();
  const allOf_1 = requireAllOf();
  const if_1 = require_if();
  const thenElse_1 = requireThenElse();
  function getApplicator(draft2020 = false) {
    const applicator2 = [
      // any
      not_1.default,
      anyOf_1.default,
      oneOf_1.default,
      allOf_1.default,
      if_1.default,
      thenElse_1.default,
      // object
      propertyNames_1.default,
      additionalProperties_1.default,
      dependencies_1.default,
      properties_1.default,
      patternProperties_1.default
    ];
    if (draft2020)
      applicator2.push(prefixItems_1.default, items2020_1.default);
    else
      applicator2.push(additionalItems_1.default, items_1.default);
    applicator2.push(contains_1.default);
    return applicator2;
  }
  applicator.default = getApplicator;
  return applicator;
}
var format$2 = {};
var format$1 = {};
var hasRequiredFormat$2;
function requireFormat$2() {
  if (hasRequiredFormat$2) return format$1;
  hasRequiredFormat$2 = 1;
  Object.defineProperty(format$1, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const error = {
    message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
  };
  const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
      const { gen, data, $data, schema, schemaCode, it } = cxt;
      const { opts, errSchemaPath, schemaEnv, self } = it;
      if (!opts.validateFormats)
        return;
      if ($data)
        validate$DataFormat();
      else
        validateFormat();
      function validate$DataFormat() {
        const fmts = gen.scopeValue("formats", {
          ref: self.formats,
          code: opts.code.formats
        });
        const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
        const fType = gen.let("fType");
        const format2 = gen.let("format");
        gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format2, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format2, fDef));
        cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
        function unknownFmt() {
          if (opts.strictSchema === false)
            return codegen_1.nil;
          return (0, codegen_1._)`${schemaCode} && !${format2}`;
        }
        function invalidFmt() {
          const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : (0, codegen_1._)`${format2}(${data})`;
          const validData = (0, codegen_1._)`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
          return (0, codegen_1._)`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
        }
      }
      function validateFormat() {
        const formatDef = self.formats[schema];
        if (!formatDef) {
          unknownFormat();
          return;
        }
        if (formatDef === true)
          return;
        const [fmtType, format2, fmtRef] = getFormat(formatDef);
        if (fmtType === ruleType)
          cxt.pass(validCondition());
        function unknownFormat() {
          if (opts.strictSchema === false) {
            self.logger.warn(unknownMsg());
            return;
          }
          throw new Error(unknownMsg());
          function unknownMsg() {
            return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
          }
        }
        function getFormat(fmtDef) {
          const code2 = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
          const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code: code2 });
          if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
            return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
          }
          return ["string", fmtDef, fmt];
        }
        function validCondition() {
          if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
            if (!schemaEnv.$async)
              throw new Error("async format in sync schema");
            return (0, codegen_1._)`await ${fmtRef}(${data})`;
          }
          return typeof format2 == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
        }
      }
    }
  };
  format$1.default = def;
  return format$1;
}
var hasRequiredFormat$1;
function requireFormat$1() {
  if (hasRequiredFormat$1) return format$2;
  hasRequiredFormat$1 = 1;
  Object.defineProperty(format$2, "__esModule", { value: true });
  const format_1 = requireFormat$2();
  const format2 = [format_1.default];
  format$2.default = format2;
  return format$2;
}
var metadata = {};
var hasRequiredMetadata;
function requireMetadata() {
  if (hasRequiredMetadata) return metadata;
  hasRequiredMetadata = 1;
  Object.defineProperty(metadata, "__esModule", { value: true });
  metadata.contentVocabulary = metadata.metadataVocabulary = void 0;
  metadata.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ];
  metadata.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ];
  return metadata;
}
var hasRequiredDraft7;
function requireDraft7() {
  if (hasRequiredDraft7) return draft7;
  hasRequiredDraft7 = 1;
  Object.defineProperty(draft7, "__esModule", { value: true });
  const core_1 = requireCore();
  const validation_1 = requireValidation();
  const applicator_1 = requireApplicator();
  const format_1 = requireFormat$1();
  const metadata_1 = requireMetadata();
  const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary
  ];
  draft7.default = draft7Vocabularies;
  return draft7;
}
var discriminator = {};
var types = {};
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  Object.defineProperty(types, "__esModule", { value: true });
  types.DiscrError = void 0;
  var DiscrError;
  (function(DiscrError2) {
    DiscrError2["Tag"] = "tag";
    DiscrError2["Mapping"] = "mapping";
  })(DiscrError || (types.DiscrError = DiscrError = {}));
  return types;
}
var hasRequiredDiscriminator;
function requireDiscriminator() {
  if (hasRequiredDiscriminator) return discriminator;
  hasRequiredDiscriminator = 1;
  Object.defineProperty(discriminator, "__esModule", { value: true });
  const codegen_1 = requireCodegen();
  const types_1 = requireTypes();
  const compile_1 = requireCompile();
  const ref_error_1 = requireRef_error();
  const util_1 = requireUtil();
  const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
  };
  const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
      const { gen, data, schema, parentSchema, it } = cxt;
      const { oneOf: oneOf2 } = parentSchema;
      if (!it.opts.discriminator) {
        throw new Error("discriminator: requires discriminator option");
      }
      const tagName = schema.propertyName;
      if (typeof tagName != "string")
        throw new Error("discriminator: requires propertyName");
      if (schema.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!oneOf2)
        throw new Error("discriminator: requires oneOf keyword");
      const valid2 = gen.let("valid", false);
      const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
      gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
      cxt.ok(valid2);
      function validateMapping() {
        const mapping = getMapping();
        gen.if(false);
        for (const tagValue in mapping) {
          gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
          gen.assign(valid2, applyTagSchema(mapping[tagValue]));
        }
        gen.else();
        cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
        gen.endIf();
      }
      function applyTagSchema(schemaProp) {
        const _valid = gen.name("valid");
        const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
        cxt.mergeEvaluated(schCxt, codegen_1.Name);
        return _valid;
      }
      function getMapping() {
        var _a;
        const oneOfMapping = {};
        const topRequired = hasRequired(parentSchema);
        let tagRequired = true;
        for (let i = 0; i < oneOf2.length; i++) {
          let sch = oneOf2[i];
          if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
            const ref2 = sch.$ref;
            sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref2);
            if (sch instanceof compile_1.SchemaEnv)
              sch = sch.schema;
            if (sch === void 0)
              throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref2);
          }
          const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
          if (typeof propSch != "object") {
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
          }
          tagRequired = tagRequired && (topRequired || hasRequired(sch));
          addMappings(propSch, i);
        }
        if (!tagRequired)
          throw new Error(`discriminator: "${tagName}" must be required`);
        return oneOfMapping;
        function hasRequired({ required: required2 }) {
          return Array.isArray(required2) && required2.includes(tagName);
        }
        function addMappings(sch, i) {
          if (sch.const) {
            addMapping(sch.const, i);
          } else if (sch.enum) {
            for (const tagValue of sch.enum) {
              addMapping(tagValue, i);
            }
          } else {
            throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
          }
        }
        function addMapping(tagValue, i) {
          if (typeof tagValue != "string" || tagValue in oneOfMapping) {
            throw new Error(`discriminator: "${tagName}" values must be unique strings`);
          }
          oneOfMapping[tagValue] = i;
        }
      }
    }
  };
  discriminator.default = def;
  return discriminator;
}
const $schema = "http://json-schema.org/draft-07/schema#";
const $id = "http://json-schema.org/draft-07/schema#";
const title = "Core schema meta-schema";
const definitions = { "schemaArray": { "type": "array", "minItems": 1, "items": { "$ref": "#" } }, "nonNegativeInteger": { "type": "integer", "minimum": 0 }, "nonNegativeIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] }, "simpleTypes": { "enum": ["array", "boolean", "integer", "null", "number", "object", "string"] }, "stringArray": { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "default": [] } };
const type = ["object", "boolean"];
const properties = { "$id": { "type": "string", "format": "uri-reference" }, "$schema": { "type": "string", "format": "uri" }, "$ref": { "type": "string", "format": "uri-reference" }, "$comment": { "type": "string" }, "title": { "type": "string" }, "description": { "type": "string" }, "default": true, "readOnly": { "type": "boolean", "default": false }, "examples": { "type": "array", "items": true }, "multipleOf": { "type": "number", "exclusiveMinimum": 0 }, "maximum": { "type": "number" }, "exclusiveMaximum": { "type": "number" }, "minimum": { "type": "number" }, "exclusiveMinimum": { "type": "number" }, "maxLength": { "$ref": "#/definitions/nonNegativeInteger" }, "minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "pattern": { "type": "string", "format": "regex" }, "additionalItems": { "$ref": "#" }, "items": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }], "default": true }, "maxItems": { "$ref": "#/definitions/nonNegativeInteger" }, "minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "uniqueItems": { "type": "boolean", "default": false }, "contains": { "$ref": "#" }, "maxProperties": { "$ref": "#/definitions/nonNegativeInteger" }, "minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "required": { "$ref": "#/definitions/stringArray" }, "additionalProperties": { "$ref": "#" }, "definitions": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "properties": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "patternProperties": { "type": "object", "additionalProperties": { "$ref": "#" }, "propertyNames": { "format": "regex" }, "default": {} }, "dependencies": { "type": "object", "additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] } }, "propertyNames": { "$ref": "#" }, "const": true, "enum": { "type": "array", "items": true, "minItems": 1, "uniqueItems": true }, "type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, { "type": "array", "items": { "$ref": "#/definitions/simpleTypes" }, "minItems": 1, "uniqueItems": true }] }, "format": { "type": "string" }, "contentMediaType": { "type": "string" }, "contentEncoding": { "type": "string" }, "if": { "$ref": "#" }, "then": { "$ref": "#" }, "else": { "$ref": "#" }, "allOf": { "$ref": "#/definitions/schemaArray" }, "anyOf": { "$ref": "#/definitions/schemaArray" }, "oneOf": { "$ref": "#/definitions/schemaArray" }, "not": { "$ref": "#" } };
const require$$3 = {
  $schema,
  $id,
  title,
  definitions,
  type,
  properties,
  "default": true
};
var hasRequiredAjv;
function requireAjv() {
  if (hasRequiredAjv) return ajv.exports;
  hasRequiredAjv = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    const core_1 = requireCore$1();
    const draft7_1 = requireDraft7();
    const discriminator_1 = requireDiscriminator();
    const draft7MetaSchema = require$$3;
    const META_SUPPORT_DATA = ["/properties"];
    const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    class Ajv extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    }
    exports.Ajv = Ajv;
    module.exports = exports = Ajv;
    module.exports.Ajv = Ajv;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv;
    var validate_1 = requireValidate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = requireCodegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = requireValidation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = requireRef_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  })(ajv, ajv.exports);
  return ajv.exports;
}
var hasRequiredLimit;
function requireLimit() {
  if (hasRequiredLimit) return limit;
  hasRequiredLimit = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatLimitDefinition = void 0;
    const ajv_1 = requireAjv();
    const codegen_1 = requireCodegen();
    const ops = codegen_1.operators;
    const KWDs = {
      formatMaximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      formatMinimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      formatExclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    const error = {
      message: ({ keyword: keyword2, schemaCode }) => codegen_1.str`should be ${KWDs[keyword2].okStr} ${schemaCode}`,
      params: ({ keyword: keyword2, schemaCode }) => codegen_1._`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
    };
    exports.formatLimitDefinition = {
      keyword: Object.keys(KWDs),
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, keyword: keyword2, it } = cxt;
        const { opts, self } = it;
        if (!opts.validateFormats)
          return;
        const fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
        if (fCxt.$data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fmt = gen.const("fmt", codegen_1._`${fmts}[${fCxt.schemaCode}]`);
          cxt.fail$data(codegen_1.or(codegen_1._`typeof ${fmt} != "object"`, codegen_1._`${fmt} instanceof RegExp`, codegen_1._`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
          const format2 = fCxt.schema;
          const fmtDef = self.formats[format2];
          if (!fmtDef || fmtDef === true)
            return;
          if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
            throw new Error(`"${keyword2}": format "${format2}" does not define "compare" function`);
          }
          const fmt = gen.scopeValue("formats", {
            key: format2,
            ref: fmtDef,
            code: opts.code.formats ? codegen_1._`${opts.code.formats}${codegen_1.getProperty(format2)}` : void 0
          });
          cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
          return codegen_1._`${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword2].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const formatLimitPlugin = (ajv2) => {
      ajv2.addKeyword(exports.formatLimitDefinition);
      return ajv2;
    };
    exports.default = formatLimitPlugin;
  })(limit);
  return limit;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist.exports;
  hasRequiredDist = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const formats_1 = requireFormats();
    const limit_1 = requireLimit();
    const codegen_1 = requireCodegen();
    const fullName = new codegen_1.Name("fullFormats");
    const fastName = new codegen_1.Name("fastFormats");
    const formatsPlugin = (ajv2, opts = { keywords: true }) => {
      if (Array.isArray(opts)) {
        addFormats(ajv2, opts, formats_1.fullFormats, fullName);
        return ajv2;
      }
      const [formats2, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
      const list = opts.formats || formats_1.formatNames;
      addFormats(ajv2, list, formats2, exportName);
      if (opts.keywords)
        limit_1.default(ajv2);
      return ajv2;
    };
    formatsPlugin.get = (name, mode = "full") => {
      const formats2 = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
      const f = formats2[name];
      if (!f)
        throw new Error(`Unknown format "${name}"`);
      return f;
    };
    function addFormats(ajv2, list, fs2, exportName) {
      var _a;
      var _b;
      (_a = (_b = ajv2.opts.code).formats) !== null && _a !== void 0 ? _a : _b.formats = codegen_1._`require("ajv-formats/dist/formats").${exportName}`;
      for (const f of list)
        ajv2.addFormat(f, fs2[f]);
    }
    module.exports = exports = formatsPlugin;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = formatsPlugin;
  })(dist, dist.exports);
  return dist.exports;
}
var mimicFn_1;
var hasRequiredMimicFn$1;
function requireMimicFn$1() {
  if (hasRequiredMimicFn$1) return mimicFn_1;
  hasRequiredMimicFn$1 = 1;
  const copyProperty = (to, from, property, ignoreNonConfigurable) => {
    if (property === "length" || property === "prototype") {
      return;
    }
    if (property === "arguments" || property === "caller") {
      return;
    }
    const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
    const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
    if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
      return;
    }
    Object.defineProperty(to, property, fromDescriptor);
  };
  const canCopyProperty = function(toDescriptor, fromDescriptor) {
    return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
  };
  const changePrototype = (to, from) => {
    const fromPrototype = Object.getPrototypeOf(from);
    if (fromPrototype === Object.getPrototypeOf(to)) {
      return;
    }
    Object.setPrototypeOf(to, fromPrototype);
  };
  const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
  const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
  const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
  const changeToString = (to, from, name) => {
    const withName = name === "" ? "" : `with ${name.trim()}() `;
    const newToString = wrappedToString.bind(null, withName, from.toString());
    Object.defineProperty(newToString, "name", toStringName);
    Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
  };
  const mimicFn2 = (to, from, { ignoreNonConfigurable = false } = {}) => {
    const { name } = to;
    for (const property of Reflect.ownKeys(from)) {
      copyProperty(to, from, property, ignoreNonConfigurable);
    }
    changePrototype(to, from);
    changeToString(to, from, name);
    return to;
  };
  mimicFn_1 = mimicFn2;
  return mimicFn_1;
}
var debounceFn;
var hasRequiredDebounceFn;
function requireDebounceFn() {
  if (hasRequiredDebounceFn) return debounceFn;
  hasRequiredDebounceFn = 1;
  const mimicFn2 = requireMimicFn$1();
  debounceFn = (inputFunction, options = {}) => {
    if (typeof inputFunction !== "function") {
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof inputFunction}\``);
    }
    const {
      wait = 0,
      before = false,
      after = true
    } = options;
    if (!before && !after) {
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    }
    let timeout;
    let result;
    const debouncedFunction = function(...arguments_) {
      const context = this;
      const later = () => {
        timeout = void 0;
        if (after) {
          result = inputFunction.apply(context, arguments_);
        }
      };
      const shouldCallNow = before && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (shouldCallNow) {
        result = inputFunction.apply(context, arguments_);
      }
      return result;
    };
    mimicFn2(debouncedFunction, inputFunction);
    debouncedFunction.cancel = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = void 0;
      }
    };
    return debouncedFunction;
  };
  return debounceFn;
}
var re = { exports: {} };
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants;
}
var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  const debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1 = debug;
  return debug_1;
}
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re.exports;
  hasRequiredRe = 1;
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src2 = exports.src = [];
    const t = exports.t = {};
    let R = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src2[index] = value;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src2[t.NUMERICIDENTIFIER]})\\.(${src2[t.NUMERICIDENTIFIER]})\\.(${src2[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src2[t.NUMERICIDENTIFIERLOOSE]})\\.(${src2[t.NUMERICIDENTIFIERLOOSE]})\\.(${src2[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src2[t.NUMERICIDENTIFIER]}|${src2[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src2[t.NUMERICIDENTIFIERLOOSE]}|${src2[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src2[t.PRERELEASEIDENTIFIER]}(?:\\.${src2[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src2[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src2[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src2[t.BUILDIDENTIFIER]}(?:\\.${src2[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src2[t.MAINVERSION]}${src2[t.PRERELEASE]}?${src2[t.BUILD]}?`);
    createToken("FULL", `^${src2[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src2[t.MAINVERSIONLOOSE]}${src2[t.PRERELEASELOOSE]}?${src2[t.BUILD]}?`);
    createToken("LOOSE", `^${src2[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src2[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src2[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src2[t.XRANGEIDENTIFIER]})(?:\\.(${src2[t.XRANGEIDENTIFIER]})(?:\\.(${src2[t.XRANGEIDENTIFIER]})(?:${src2[t.PRERELEASE]})?${src2[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src2[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src2[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src2[t.XRANGEIDENTIFIERLOOSE]})(?:${src2[t.PRERELEASELOOSE]})?${src2[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src2[t.GTLT]}\\s*${src2[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src2[t.GTLT]}\\s*${src2[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src2[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src2[t.COERCEPLAIN] + `(?:${src2[t.PRERELEASE]})?(?:${src2[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src2[t.COERCE], true);
    createToken("COERCERTLFULL", src2[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src2[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src2[t.LONETILDE]}${src2[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src2[t.LONETILDE]}${src2[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src2[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src2[t.LONECARET]}${src2[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src2[t.LONECARET]}${src2[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src2[t.GTLT]}\\s*(${src2[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src2[t.GTLT]}\\s*(${src2[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src2[t.GTLT]}\\s*(${src2[t.LOOSEPLAIN]}|${src2[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src2[t.XRANGEPLAIN]})\\s+-\\s+(${src2[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src2[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src2[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports);
  return re.exports;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}
var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a, b) => {
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}
var semver$1;
var hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$1;
  hasRequiredSemver$1 = 1;
  const debug = requireDebug();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
  const { safeRe: re2, t } = requireRe();
  const parseOptions = requireParseOptions();
  const { compareIdentifiers } = requireIdentifiers();
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m = version.trim().match(options.loose ? re2[t.LOOSE] : re2[t.FULL]);
      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map((id2) => {
          if (/^[0-9]+$/.test(id2)) {
            const num = +id2;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id2;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug("build compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === "number") {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver$1 = SemVer;
  return semver$1;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver$1();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse;
  return parse_1;
}
var valid_1;
var hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1;
  hasRequiredValid$1 = 1;
  const parse = requireParse();
  const valid2 = (version, options) => {
    const v = parse(version, options);
    return v ? v.version : null;
  };
  valid_1 = valid2;
  return valid_1;
}
var clean_1;
var hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const parse = requireParse();
  const clean = (version, options) => {
    const s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  };
  clean_1 = clean;
  return clean_1;
}
var inc_1;
var hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const SemVer = requireSemver$1();
  const inc = (version, release, options, identifier, identifierBase) => {
    if (typeof options === "string") {
      identifierBase = identifier;
      identifier = options;
      options = void 0;
    }
    try {
      return new SemVer(
        version instanceof SemVer ? version.version : version,
        options
      ).inc(release, identifier, identifierBase).version;
    } catch (er) {
      return null;
    }
  };
  inc_1 = inc;
  return inc_1;
}
var diff_1;
var hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  const parse = requireParse();
  const diff = (version1, version2) => {
    const v1 = parse(version1, null, true);
    const v2 = parse(version2, null, true);
    const comparison = v1.compare(v2);
    if (comparison === 0) {
      return null;
    }
    const v1Higher = comparison > 0;
    const highVersion = v1Higher ? v1 : v2;
    const lowVersion = v1Higher ? v2 : v1;
    const highHasPre = !!highVersion.prerelease.length;
    const lowHasPre = !!lowVersion.prerelease.length;
    if (lowHasPre && !highHasPre) {
      if (!lowVersion.patch && !lowVersion.minor) {
        return "major";
      }
      if (highVersion.patch) {
        return "patch";
      }
      if (highVersion.minor) {
        return "minor";
      }
      return "major";
    }
    const prefix = highHasPre ? "pre" : "";
    if (v1.major !== v2.major) {
      return prefix + "major";
    }
    if (v1.minor !== v2.minor) {
      return prefix + "minor";
    }
    if (v1.patch !== v2.patch) {
      return prefix + "patch";
    }
    return "prerelease";
  };
  diff_1 = diff;
  return diff_1;
}
var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver$1();
  const major = (a, loose) => new SemVer(a, loose).major;
  major_1 = major;
  return major_1;
}
var minor_1;
var hasRequiredMinor;
function requireMinor() {
  if (hasRequiredMinor) return minor_1;
  hasRequiredMinor = 1;
  const SemVer = requireSemver$1();
  const minor = (a, loose) => new SemVer(a, loose).minor;
  minor_1 = minor;
  return minor_1;
}
var patch_1;
var hasRequiredPatch;
function requirePatch() {
  if (hasRequiredPatch) return patch_1;
  hasRequiredPatch = 1;
  const SemVer = requireSemver$1();
  const patch = (a, loose) => new SemVer(a, loose).patch;
  patch_1 = patch;
  return patch_1;
}
var prerelease_1;
var hasRequiredPrerelease;
function requirePrerelease() {
  if (hasRequiredPrerelease) return prerelease_1;
  hasRequiredPrerelease = 1;
  const parse = requireParse();
  const prerelease = (version, options) => {
    const parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  };
  prerelease_1 = prerelease;
  return prerelease_1;
}
var compare_1;
var hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const SemVer = requireSemver$1();
  const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  compare_1 = compare;
  return compare_1;
}
var rcompare_1;
var hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const compare = requireCompare();
  const rcompare = (a, b, loose) => compare(b, a, loose);
  rcompare_1 = rcompare;
  return rcompare_1;
}
var compareLoose_1;
var hasRequiredCompareLoose;
function requireCompareLoose() {
  if (hasRequiredCompareLoose) return compareLoose_1;
  hasRequiredCompareLoose = 1;
  const compare = requireCompare();
  const compareLoose = (a, b) => compare(a, b, true);
  compareLoose_1 = compareLoose;
  return compareLoose_1;
}
var compareBuild_1;
var hasRequiredCompareBuild;
function requireCompareBuild() {
  if (hasRequiredCompareBuild) return compareBuild_1;
  hasRequiredCompareBuild = 1;
  const SemVer = requireSemver$1();
  const compareBuild = (a, b, loose) => {
    const versionA = new SemVer(a, loose);
    const versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  };
  compareBuild_1 = compareBuild;
  return compareBuild_1;
}
var sort_1;
var hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const compareBuild = requireCompareBuild();
  const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
  sort_1 = sort;
  return sort_1;
}
var rsort_1;
var hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const compareBuild = requireCompareBuild();
  const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  rsort_1 = rsort;
  return rsort_1;
}
var gt_1;
var hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const compare = requireCompare();
  const gt = (a, b, loose) => compare(a, b, loose) > 0;
  gt_1 = gt;
  return gt_1;
}
var lt_1;
var hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const compare = requireCompare();
  const lt = (a, b, loose) => compare(a, b, loose) < 0;
  lt_1 = lt;
  return lt_1;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const compare = requireCompare();
  const eq = (a, b, loose) => compare(a, b, loose) === 0;
  eq_1 = eq;
  return eq_1;
}
var neq_1;
var hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const compare = requireCompare();
  const neq = (a, b, loose) => compare(a, b, loose) !== 0;
  neq_1 = neq;
  return neq_1;
}
var gte_1;
var hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const compare = requireCompare();
  const gte = (a, b, loose) => compare(a, b, loose) >= 0;
  gte_1 = gte;
  return gte_1;
}
var lte_1;
var hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const compare = requireCompare();
  const lte = (a, b, loose) => compare(a, b, loose) <= 0;
  lte_1 = lte;
  return lte_1;
}
var cmp_1;
var hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const eq = requireEq();
  const neq = requireNeq();
  const gt = requireGt();
  const gte = requireGte();
  const lt = requireLt();
  const lte = requireLte();
  const cmp = (a, op, b, loose) => {
    switch (op) {
      case "===":
        if (typeof a === "object") {
          a = a.version;
        }
        if (typeof b === "object") {
          b = b.version;
        }
        return a === b;
      case "!==":
        if (typeof a === "object") {
          a = a.version;
        }
        if (typeof b === "object") {
          b = b.version;
        }
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError(`Invalid operator: ${op}`);
    }
  };
  cmp_1 = cmp;
  return cmp_1;
}
var coerce_1;
var hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const SemVer = requireSemver$1();
  const parse = requireParse();
  const { safeRe: re2, t } = requireRe();
  const coerce = (version, options) => {
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version === "number") {
      version = String(version);
    }
    if (typeof version !== "string") {
      return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
      match = version.match(options.includePrerelease ? re2[t.COERCEFULL] : re2[t.COERCE]);
    } else {
      const coerceRtlRegex = options.includePrerelease ? re2[t.COERCERTLFULL] : re2[t.COERCERTL];
      let next;
      while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
      }
      coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) {
      return null;
    }
    const major = match[2];
    const minor = match[3] || "0";
    const patch = match[4] || "0";
    const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
    const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
    return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
  };
  coerce_1 = coerce;
  return coerce_1;
}
var lrucache;
var hasRequiredLrucache;
function requireLrucache() {
  if (hasRequiredLrucache) return lrucache;
  hasRequiredLrucache = 1;
  class LRUCache {
    constructor() {
      this.max = 1e3;
      this.map = /* @__PURE__ */ new Map();
    }
    get(key) {
      const value = this.map.get(key);
      if (value === void 0) {
        return void 0;
      } else {
        this.map.delete(key);
        this.map.set(key, value);
        return value;
      }
    }
    delete(key) {
      return this.map.delete(key);
    }
    set(key, value) {
      const deleted = this.delete(key);
      if (!deleted && value !== void 0) {
        if (this.map.size >= this.max) {
          const firstKey = this.map.keys().next().value;
          this.delete(firstKey);
        }
        this.map.set(key, value);
      }
      return this;
    }
  }
  lrucache = LRUCache;
  return lrucache;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const SPACE_CHARACTERS = /\s+/g;
  class Range {
    constructor(range2, options) {
      options = parseOptions(options);
      if (range2 instanceof Range) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.formatted = void 0;
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().replace(SPACE_CHARACTERS, " ");
      this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let i = 0; i < this.set.length; i++) {
          if (i > 0) {
            this.formatted += "||";
          }
          const comps = this.set[i];
          for (let k = 0; k < comps.length; k++) {
            if (k > 0) {
              this.formatted += " ";
            }
            this.formatted += comps[k].toString().trim();
          }
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t.HYPHENRANGELOOSE] : re2[t.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug("hyphen replace", range2);
      range2 = range2.replace(re2[t.COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range2);
      range2 = range2.replace(re2[t.TILDETRIM], tildeTrimReplace);
      debug("tilde trim", range2);
      range2 = range2.replace(re2[t.CARETTRIM], caretTrimReplace);
      debug("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t.COMPARATORLOOSE]);
        });
      }
      debug("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range;
  const LRU = requireLrucache();
  const cache = new LRU();
  const parseOptions = requireParseOptions();
  const Comparator = requireComparator();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const {
    safeRe: re2,
    t,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = requireRe();
  const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    debug("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug("caret", comp);
    comp = replaceTildes(comp, options);
    debug("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug("xrange", comp);
    comp = replaceStars(comp, options);
    debug("stars", comp);
    return comp;
  };
  const isX = (id2) => !id2 || id2.toLowerCase() === "x" || id2 === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t.TILDELOOSE] : re2[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("tilde", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug("caret", comp, options);
    const r = options.loose ? re2[t.CARETLOOSE] : re2[t.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("caret", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t.XRANGELOOSE] : re2[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug("replaceStars", comp, options);
    return comp.trim().replace(re2[t.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === Comparator.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY = Symbol("SemVer ANY");
  class Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      options = parseOptions(options);
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t.COMPARATORLOOSE] : re2[t.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY || version === ANY) {
        return true;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range(this.value, options).test(comp.semver);
      }
      options = parseOptions(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator;
  const parseOptions = requireParseOptions();
  const { safeRe: re2, t } = requireRe();
  const cmp = requireCmp();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const Range = requireRange();
  return comparator;
}
var satisfies_1;
var hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const Range = requireRange();
  const satisfies = (version, range2, options) => {
    try {
      range2 = new Range(range2, options);
    } catch (er) {
      return false;
    }
    return range2.test(version);
  };
  satisfies_1 = satisfies;
  return satisfies_1;
}
var toComparators_1;
var hasRequiredToComparators;
function requireToComparators() {
  if (hasRequiredToComparators) return toComparators_1;
  hasRequiredToComparators = 1;
  const Range = requireRange();
  const toComparators = (range2, options) => new Range(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
  toComparators_1 = toComparators;
  return toComparators_1;
}
var maxSatisfying_1;
var hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const maxSatisfying = (versions, range2, options) => {
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range2, options);
    } catch (er) {
      return null;
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  };
  maxSatisfying_1 = maxSatisfying;
  return maxSatisfying_1;
}
var minSatisfying_1;
var hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const minSatisfying = (versions, range2, options) => {
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range2, options);
    } catch (er) {
      return null;
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  };
  minSatisfying_1 = minSatisfying;
  return minSatisfying_1;
}
var minVersion_1;
var hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const gt = requireGt();
  const minVersion = (range2, loose) => {
    range2 = new Range(range2, loose);
    let minver = new SemVer("0.0.0");
    if (range2.test(minver)) {
      return minver;
    }
    minver = new SemVer("0.0.0-0");
    if (range2.test(minver)) {
      return minver;
    }
    minver = null;
    for (let i = 0; i < range2.set.length; ++i) {
      const comparators = range2.set[i];
      let setMin = null;
      comparators.forEach((comparator2) => {
        const compver = new SemVer(comparator2.semver.version);
        switch (comparator2.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          /* fallthrough */
          case "":
          case ">=":
            if (!setMin || gt(compver, setMin)) {
              setMin = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${comparator2.operator}`);
        }
      });
      if (setMin && (!minver || gt(minver, setMin))) {
        minver = setMin;
      }
    }
    if (minver && range2.test(minver)) {
      return minver;
    }
    return null;
  };
  minVersion_1 = minVersion;
  return minVersion_1;
}
var valid;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid;
  hasRequiredValid = 1;
  const Range = requireRange();
  const validRange = (range2, options) => {
    try {
      return new Range(range2, options).range || "*";
    } catch (er) {
      return null;
    }
  };
  valid = validRange;
  return valid;
}
var outside_1;
var hasRequiredOutside;
function requireOutside() {
  if (hasRequiredOutside) return outside_1;
  hasRequiredOutside = 1;
  const SemVer = requireSemver$1();
  const Comparator = requireComparator();
  const { ANY } = Comparator;
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const gt = requireGt();
  const lt = requireLt();
  const lte = requireLte();
  const gte = requireGte();
  const outside = (version, range2, hilo, options) => {
    version = new SemVer(version, options);
    range2 = new Range(range2, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range2, options)) {
      return false;
    }
    for (let i = 0; i < range2.set.length; ++i) {
      const comparators = range2.set[i];
      let high = null;
      let low = null;
      comparators.forEach((comparator2) => {
        if (comparator2.semver === ANY) {
          comparator2 = new Comparator(">=0.0.0");
        }
        high = high || comparator2;
        low = low || comparator2;
        if (gtfn(comparator2.semver, high.semver, options)) {
          high = comparator2;
        } else if (ltfn(comparator2.semver, low.semver, options)) {
          low = comparator2;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  };
  outside_1 = outside;
  return outside_1;
}
var gtr_1;
var hasRequiredGtr;
function requireGtr() {
  if (hasRequiredGtr) return gtr_1;
  hasRequiredGtr = 1;
  const outside = requireOutside();
  const gtr = (version, range2, options) => outside(version, range2, ">", options);
  gtr_1 = gtr;
  return gtr_1;
}
var ltr_1;
var hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const outside = requireOutside();
  const ltr = (version, range2, options) => outside(version, range2, "<", options);
  ltr_1 = ltr;
  return ltr_1;
}
var intersects_1;
var hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const Range = requireRange();
  const intersects = (r1, r2, options) => {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2, options);
  };
  intersects_1 = intersects;
  return intersects_1;
}
var simplify;
var hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  const satisfies = requireSatisfies();
  const compare = requireCompare();
  simplify = (versions, range2, options) => {
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b) => compare(a, b, options));
    for (const version of v) {
      const included = satisfies(version, range2, options);
      if (included) {
        prev = version;
        if (!first) {
          first = version;
        }
      } else {
        if (prev) {
          set.push([first, prev]);
        }
        prev = null;
        first = null;
      }
    }
    if (first) {
      set.push([first, null]);
    }
    const ranges = [];
    for (const [min, max] of set) {
      if (min === max) {
        ranges.push(min);
      } else if (!max && min === v[0]) {
        ranges.push("*");
      } else if (!max) {
        ranges.push(`>=${min}`);
      } else if (min === v[0]) {
        ranges.push(`<=${max}`);
      } else {
        ranges.push(`${min} - ${max}`);
      }
    }
    const simplified = ranges.join(" || ");
    const original = typeof range2.raw === "string" ? range2.raw : String(range2);
    return simplified.length < original.length ? simplified : range2;
  };
  return simplify;
}
var subset_1;
var hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const Range = requireRange();
  const Comparator = requireComparator();
  const { ANY } = Comparator;
  const satisfies = requireSatisfies();
  const compare = requireCompare();
  const subset = (sub, dom, options = {}) => {
    if (sub === dom) {
      return true;
    }
    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
    return true;
  };
  const minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
  const minimumVersion = [new Comparator(">=0.0.0")];
  const simpleSubset = (sub, dom, options) => {
    if (sub === dom) {
      return true;
    }
    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY) {
        return true;
      } else if (options.includePrerelease) {
        sub = minimumVersionWithPreRelease;
      } else {
        sub = minimumVersion;
      }
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options.includePrerelease) {
        return true;
      } else {
        dom = minimumVersion;
      }
    }
    const eqSet = /* @__PURE__ */ new Set();
    let gt, lt;
    for (const c of sub) {
      if (c.operator === ">" || c.operator === ">=") {
        gt = higherGT(gt, c, options);
      } else if (c.operator === "<" || c.operator === "<=") {
        lt = lowerLT(lt, c, options);
      } else {
        eqSet.add(c.semver);
      }
    }
    if (eqSet.size > 1) {
      return null;
    }
    let gtltComp;
    if (gt && lt) {
      gtltComp = compare(gt.semver, lt.semver, options);
      if (gtltComp > 0) {
        return null;
      } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
        return null;
      }
    }
    for (const eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options)) {
        return null;
      }
      if (lt && !satisfies(eq, String(lt), options)) {
        return null;
      }
      for (const c of dom) {
        if (!satisfies(eq, String(c), options)) {
          return false;
        }
      }
      return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
      needDomLTPre = false;
    }
    for (const c of dom) {
      hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
      hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
      if (gt) {
        if (needDomGTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
            needDomGTPre = false;
          }
        }
        if (c.operator === ">" || c.operator === ">=") {
          higher = higherGT(gt, c, options);
          if (higher === c && higher !== gt) {
            return false;
          }
        } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
          return false;
        }
      }
      if (lt) {
        if (needDomLTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
            needDomLTPre = false;
          }
        }
        if (c.operator === "<" || c.operator === "<=") {
          lower = lowerLT(lt, c, options);
          if (lower === c && lower !== lt) {
            return false;
          }
        } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
          return false;
        }
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0) {
        return false;
      }
    }
    if (gt && hasDomLT && !lt && gtltComp !== 0) {
      return false;
    }
    if (lt && hasDomGT && !gt && gtltComp !== 0) {
      return false;
    }
    if (needDomGTPre || needDomLTPre) {
      return false;
    }
    return true;
  };
  const higherGT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
  };
  const lowerLT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
  };
  subset_1 = subset;
  return subset_1;
}
var semver;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const internalRe = requireRe();
  const constants2 = requireConstants();
  const SemVer = requireSemver$1();
  const identifiers2 = requireIdentifiers();
  const parse = requireParse();
  const valid2 = requireValid$1();
  const clean = requireClean();
  const inc = requireInc();
  const diff = requireDiff();
  const major = requireMajor();
  const minor = requireMinor();
  const patch = requirePatch();
  const prerelease = requirePrerelease();
  const compare = requireCompare();
  const rcompare = requireRcompare();
  const compareLoose = requireCompareLoose();
  const compareBuild = requireCompareBuild();
  const sort = requireSort();
  const rsort = requireRsort();
  const gt = requireGt();
  const lt = requireLt();
  const eq = requireEq();
  const neq = requireNeq();
  const gte = requireGte();
  const lte = requireLte();
  const cmp = requireCmp();
  const coerce = requireCoerce();
  const Comparator = requireComparator();
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const toComparators = requireToComparators();
  const maxSatisfying = requireMaxSatisfying();
  const minSatisfying = requireMinSatisfying();
  const minVersion = requireMinVersion();
  const validRange = requireValid();
  const outside = requireOutside();
  const gtr = requireGtr();
  const ltr = requireLtr();
  const intersects = requireIntersects();
  const simplifyRange = requireSimplify();
  const subset = requireSubset();
  semver = {
    parse,
    valid: valid2,
    clean,
    inc,
    diff,
    major,
    minor,
    patch,
    prerelease,
    compare,
    rcompare,
    compareLoose,
    compareBuild,
    sort,
    rsort,
    gt,
    lt,
    eq,
    neq,
    gte,
    lte,
    cmp,
    coerce,
    Comparator,
    Range,
    satisfies,
    toComparators,
    maxSatisfying,
    minSatisfying,
    minVersion,
    validRange,
    outside,
    gtr,
    ltr,
    intersects,
    simplifyRange,
    subset,
    SemVer,
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants2.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: constants2.RELEASE_TYPES,
    compareIdentifiers: identifiers2.compareIdentifiers,
    rcompareIdentifiers: identifiers2.rcompareIdentifiers
  };
  return semver;
}
var onetime = { exports: {} };
var mimicFn = { exports: {} };
var hasRequiredMimicFn;
function requireMimicFn() {
  if (hasRequiredMimicFn) return mimicFn.exports;
  hasRequiredMimicFn = 1;
  const mimicFn$1 = (to, from) => {
    for (const prop of Reflect.ownKeys(from)) {
      Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
    }
    return to;
  };
  mimicFn.exports = mimicFn$1;
  mimicFn.exports.default = mimicFn$1;
  return mimicFn.exports;
}
var hasRequiredOnetime;
function requireOnetime() {
  if (hasRequiredOnetime) return onetime.exports;
  hasRequiredOnetime = 1;
  const mimicFn2 = requireMimicFn();
  const calledFunctions = /* @__PURE__ */ new WeakMap();
  const onetime$1 = (function_, options = {}) => {
    if (typeof function_ !== "function") {
      throw new TypeError("Expected a function");
    }
    let returnValue;
    let callCount = 0;
    const functionName = function_.displayName || function_.name || "<anonymous>";
    const onetime2 = function(...arguments_) {
      calledFunctions.set(onetime2, ++callCount);
      if (callCount === 1) {
        returnValue = function_.apply(this, arguments_);
        function_ = null;
      } else if (options.throw === true) {
        throw new Error(`Function \`${functionName}\` can only be called once`);
      }
      return returnValue;
    };
    mimicFn2(onetime2, function_);
    calledFunctions.set(onetime2, callCount);
    return onetime2;
  };
  onetime.exports = onetime$1;
  onetime.exports.default = onetime$1;
  onetime.exports.callCount = (function_) => {
    if (!calledFunctions.has(function_)) {
      throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
    }
    return calledFunctions.get(function_);
  };
  return onetime.exports;
}
var source = source$1.exports;
var hasRequiredSource;
function requireSource() {
  if (hasRequiredSource) return source$1.exports;
  hasRequiredSource = 1;
  (function(module, exports) {
    var __classPrivateFieldSet = source && source.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = source && source.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _a, _b;
    var _Conf_validator, _Conf_encryptionKey, _Conf_options, _Conf_defaultValues;
    Object.defineProperty(exports, "__esModule", { value: true });
    const util_1 = require$$0$2;
    const fs2 = require$$0;
    const path2 = require$$0$1;
    const crypto = require$$3$2;
    const assert = require$$4;
    const events_1 = require$$0$3;
    const dotProp2 = requireDotProp();
    const pkgUp2 = requirePkgUp();
    const envPaths2 = requireEnvPaths();
    const atomically = requireDist$1();
    const ajv_1 = requireAjv$1();
    const ajv_formats_1 = requireDist();
    const debounceFn2 = requireDebounceFn();
    const semver2 = requireSemver();
    const onetime2 = requireOnetime();
    const encryptionAlgorithm = "aes-256-cbc";
    const createPlainObject = () => {
      return /* @__PURE__ */ Object.create(null);
    };
    const isExist = (data) => {
      return data !== void 0 && data !== null;
    };
    let parentDir = "";
    try {
      delete require.cache[__filename];
      parentDir = path2.dirname((_b = (_a = module.parent) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : ".");
    } catch (_c) {
    }
    const checkValueType = (key, value) => {
      const nonJsonTypes = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]);
      const type2 = typeof value;
      if (nonJsonTypes.has(type2)) {
        throw new TypeError(`Setting a value of type \`${type2}\` for key \`${key}\` is not allowed as it's not supported by JSON`);
      }
    };
    const INTERNAL_KEY = "__internal__";
    const MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`;
    class Conf {
      constructor(partialOptions = {}) {
        var _a2;
        _Conf_validator.set(this, void 0);
        _Conf_encryptionKey.set(this, void 0);
        _Conf_options.set(this, void 0);
        _Conf_defaultValues.set(this, {});
        this._deserialize = (value) => JSON.parse(value);
        this._serialize = (value) => JSON.stringify(value, void 0, "	");
        const options = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: false,
          accessPropertiesByDotNotation: true,
          configFileMode: 438,
          ...partialOptions
        };
        const getPackageData = onetime2(() => {
          const packagePath = pkgUp2.sync({ cwd: parentDir });
          const packageData = packagePath && JSON.parse(fs2.readFileSync(packagePath, "utf8"));
          return packageData !== null && packageData !== void 0 ? packageData : {};
        });
        if (!options.cwd) {
          if (!options.projectName) {
            options.projectName = getPackageData().name;
          }
          if (!options.projectName) {
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          }
          options.cwd = envPaths2(options.projectName, { suffix: options.projectSuffix }).config;
        }
        __classPrivateFieldSet(this, _Conf_options, options, "f");
        if (options.schema) {
          if (typeof options.schema !== "object") {
            throw new TypeError("The `schema` option must be an object.");
          }
          const ajv2 = new ajv_1.default({
            allErrors: true,
            useDefaults: true
          });
          (0, ajv_formats_1.default)(ajv2);
          const schema = {
            type: "object",
            properties: options.schema
          };
          __classPrivateFieldSet(this, _Conf_validator, ajv2.compile(schema), "f");
          for (const [key, value] of Object.entries(options.schema)) {
            if (value === null || value === void 0 ? void 0 : value.default) {
              __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key] = value.default;
            }
          }
        }
        if (options.defaults) {
          __classPrivateFieldSet(this, _Conf_defaultValues, {
            ...__classPrivateFieldGet(this, _Conf_defaultValues, "f"),
            ...options.defaults
          }, "f");
        }
        if (options.serialize) {
          this._serialize = options.serialize;
        }
        if (options.deserialize) {
          this._deserialize = options.deserialize;
        }
        this.events = new events_1.EventEmitter();
        __classPrivateFieldSet(this, _Conf_encryptionKey, options.encryptionKey, "f");
        const fileExtension = options.fileExtension ? `.${options.fileExtension}` : "";
        this.path = path2.resolve(options.cwd, `${(_a2 = options.configName) !== null && _a2 !== void 0 ? _a2 : "config"}${fileExtension}`);
        const fileStore = this.store;
        const store2 = Object.assign(createPlainObject(), options.defaults, fileStore);
        this._validate(store2);
        try {
          assert.deepEqual(fileStore, store2);
        } catch (_b2) {
          this.store = store2;
        }
        if (options.watch) {
          this._watch();
        }
        if (options.migrations) {
          if (!options.projectVersion) {
            options.projectVersion = getPackageData().version;
          }
          if (!options.projectVersion) {
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          }
          this._migrate(options.migrations, options.projectVersion, options.beforeEachMigration);
        }
      }
      get(key, defaultValue) {
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          return this._get(key, defaultValue);
        }
        const { store: store2 } = this;
        return key in store2 ? store2[key] : defaultValue;
      }
      set(key, value) {
        if (typeof key !== "string" && typeof key !== "object") {
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`);
        }
        if (typeof key !== "object" && value === void 0) {
          throw new TypeError("Use `delete()` to clear values");
        }
        if (this._containsReservedKey(key)) {
          throw new TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
        }
        const { store: store2 } = this;
        const set = (key2, value2) => {
          checkValueType(key2, value2);
          if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
            dotProp2.set(store2, key2, value2);
          } else {
            store2[key2] = value2;
          }
        };
        if (typeof key === "object") {
          const object2 = key;
          for (const [key2, value2] of Object.entries(object2)) {
            set(key2, value2);
          }
        } else {
          set(key, value);
        }
        this.store = store2;
      }
      /**
          Check if an item exists.
      
          @param key - The key of the item to check.
          */
      has(key) {
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          return dotProp2.has(this.store, key);
        }
        return key in this.store;
      }
      /**
          Reset items to their default values, as defined by the `defaults` or `schema` option.
      
          @see `clear()` to reset all items.
      
          @param keys - The keys of the items to reset.
          */
      reset(...keys) {
        for (const key of keys) {
          if (isExist(__classPrivateFieldGet(this, _Conf_defaultValues, "f")[key])) {
            this.set(key, __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key]);
          }
        }
      }
      /**
          Delete an item.
      
          @param key - The key of the item to delete.
          */
      delete(key) {
        const { store: store2 } = this;
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          dotProp2.delete(store2, key);
        } else {
          delete store2[key];
        }
        this.store = store2;
      }
      /**
          Delete all items.
      
          This resets known items to their default values, if defined by the `defaults` or `schema` option.
          */
      clear() {
        this.store = createPlainObject();
        for (const key of Object.keys(__classPrivateFieldGet(this, _Conf_defaultValues, "f"))) {
          this.reset(key);
        }
      }
      /**
          Watches the given `key`, calling `callback` on any changes.
      
          @param key - The key wo watch.
          @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
          @returns A function, that when called, will unsubscribe.
          */
      onDidChange(key, callback) {
        if (typeof key !== "string") {
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof key}`);
        }
        if (typeof callback !== "function") {
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
        }
        return this._handleChange(() => this.get(key), callback);
      }
      /**
          Watches the whole config object, calling `callback` on any changes.
      
          @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
          @returns A function, that when called, will unsubscribe.
          */
      onDidAnyChange(callback) {
        if (typeof callback !== "function") {
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
        }
        return this._handleChange(() => this.store, callback);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const data = fs2.readFileSync(this.path, __classPrivateFieldGet(this, _Conf_encryptionKey, "f") ? null : "utf8");
          const dataString = this._encryptData(data);
          const deserializedData = this._deserialize(dataString);
          this._validate(deserializedData);
          return Object.assign(createPlainObject(), deserializedData);
        } catch (error) {
          if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
            this._ensureDirectory();
            return createPlainObject();
          }
          if (__classPrivateFieldGet(this, _Conf_options, "f").clearInvalidConfig && error.name === "SyntaxError") {
            return createPlainObject();
          }
          throw error;
        }
      }
      set store(value) {
        this._ensureDirectory();
        this._validate(value);
        this._write(value);
        this.events.emit("change");
      }
      *[(_Conf_validator = /* @__PURE__ */ new WeakMap(), _Conf_encryptionKey = /* @__PURE__ */ new WeakMap(), _Conf_options = /* @__PURE__ */ new WeakMap(), _Conf_defaultValues = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [key, value] of Object.entries(this.store)) {
          yield [key, value];
        }
      }
      _encryptData(data) {
        if (!__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
          return data.toString();
        }
        try {
          if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
            try {
              if (data.slice(16, 17).toString() === ":") {
                const initializationVector = data.slice(0, 16);
                const password = crypto.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
                const decipher = crypto.createDecipheriv(encryptionAlgorithm, password, initializationVector);
                data = Buffer.concat([decipher.update(Buffer.from(data.slice(17))), decipher.final()]).toString("utf8");
              } else {
                const decipher = crypto.createDecipher(encryptionAlgorithm, __classPrivateFieldGet(this, _Conf_encryptionKey, "f"));
                data = Buffer.concat([decipher.update(Buffer.from(data)), decipher.final()]).toString("utf8");
              }
            } catch (_a2) {
            }
          }
        } catch (_b2) {
        }
        return data.toString();
      }
      _handleChange(getter, callback) {
        let currentValue = getter();
        const onChange = () => {
          const oldValue = currentValue;
          const newValue = getter();
          if ((0, util_1.isDeepStrictEqual)(newValue, oldValue)) {
            return;
          }
          currentValue = newValue;
          callback.call(this, newValue, oldValue);
        };
        this.events.on("change", onChange);
        return () => this.events.removeListener("change", onChange);
      }
      _validate(data) {
        if (!__classPrivateFieldGet(this, _Conf_validator, "f")) {
          return;
        }
        const valid2 = __classPrivateFieldGet(this, _Conf_validator, "f").call(this, data);
        if (valid2 || !__classPrivateFieldGet(this, _Conf_validator, "f").errors) {
          return;
        }
        const errors2 = __classPrivateFieldGet(this, _Conf_validator, "f").errors.map(({ instancePath, message = "" }) => `\`${instancePath.slice(1)}\` ${message}`);
        throw new Error("Config schema violation: " + errors2.join("; "));
      }
      _ensureDirectory() {
        fs2.mkdirSync(path2.dirname(this.path), { recursive: true });
      }
      _write(value) {
        let data = this._serialize(value);
        if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
          const initializationVector = crypto.randomBytes(16);
          const password = crypto.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
          const cipher = crypto.createCipheriv(encryptionAlgorithm, password, initializationVector);
          data = Buffer.concat([initializationVector, Buffer.from(":"), cipher.update(Buffer.from(data)), cipher.final()]);
        }
        if (process.env.SNAP) {
          fs2.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
        } else {
          try {
            atomically.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
          } catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === "EXDEV") {
              fs2.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
              return;
            }
            throw error;
          }
        }
      }
      _watch() {
        this._ensureDirectory();
        if (!fs2.existsSync(this.path)) {
          this._write(createPlainObject());
        }
        if (process.platform === "win32") {
          fs2.watch(this.path, { persistent: false }, debounceFn2(() => {
            this.events.emit("change");
          }, { wait: 100 }));
        } else {
          fs2.watchFile(this.path, { persistent: false }, debounceFn2(() => {
            this.events.emit("change");
          }, { wait: 5e3 }));
        }
      }
      _migrate(migrations, versionToMigrate, beforeEachMigration) {
        let previousMigratedVersion = this._get(MIGRATION_KEY, "0.0.0");
        const newerVersions = Object.keys(migrations).filter((candidateVersion) => this._shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate));
        let storeBackup = { ...this.store };
        for (const version of newerVersions) {
          try {
            if (beforeEachMigration) {
              beforeEachMigration(this, {
                fromVersion: previousMigratedVersion,
                toVersion: version,
                finalVersion: versionToMigrate,
                versions: newerVersions
              });
            }
            const migration = migrations[version];
            migration(this);
            this._set(MIGRATION_KEY, version);
            previousMigratedVersion = version;
            storeBackup = { ...this.store };
          } catch (error) {
            this.store = storeBackup;
            throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error}`);
          }
        }
        if (this._isVersionInRangeFormat(previousMigratedVersion) || !semver2.eq(previousMigratedVersion, versionToMigrate)) {
          this._set(MIGRATION_KEY, versionToMigrate);
        }
      }
      _containsReservedKey(key) {
        if (typeof key === "object") {
          const firsKey = Object.keys(key)[0];
          if (firsKey === INTERNAL_KEY) {
            return true;
          }
        }
        if (typeof key !== "string") {
          return false;
        }
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          if (key.startsWith(`${INTERNAL_KEY}.`)) {
            return true;
          }
          return false;
        }
        return false;
      }
      _isVersionInRangeFormat(version) {
        return semver2.clean(version) === null;
      }
      _shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate) {
        if (this._isVersionInRangeFormat(candidateVersion)) {
          if (previousMigratedVersion !== "0.0.0" && semver2.satisfies(previousMigratedVersion, candidateVersion)) {
            return false;
          }
          return semver2.satisfies(versionToMigrate, candidateVersion);
        }
        if (semver2.lte(candidateVersion, previousMigratedVersion)) {
          return false;
        }
        if (semver2.gt(candidateVersion, versionToMigrate)) {
          return false;
        }
        return true;
      }
      _get(key, defaultValue) {
        return dotProp2.get(this.store, key, defaultValue);
      }
      _set(key, value) {
        const { store: store2 } = this;
        dotProp2.set(store2, key, value);
        this.store = store2;
      }
    }
    exports.default = Conf;
    module.exports = Conf;
    module.exports.default = Conf;
  })(source$1, source$1.exports);
  return source$1.exports;
}
var electronStore;
var hasRequiredElectronStore;
function requireElectronStore() {
  if (hasRequiredElectronStore) return electronStore;
  hasRequiredElectronStore = 1;
  const path2 = require$$0$1;
  const { app: app2, ipcMain: ipcMain2, ipcRenderer, shell } = require$$1$1;
  const Conf = requireSource();
  let isInitialized = false;
  const initDataListener = () => {
    if (!ipcMain2 || !app2) {
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    }
    const appData = {
      defaultCwd: app2.getPath("userData"),
      appVersion: app2.getVersion()
    };
    if (isInitialized) {
      return appData;
    }
    ipcMain2.on("electron-store-get-data", (event) => {
      event.returnValue = appData;
    });
    isInitialized = true;
    return appData;
  };
  class ElectronStore extends Conf {
    constructor(options) {
      let defaultCwd;
      let appVersion;
      if (ipcRenderer) {
        const appData = ipcRenderer.sendSync("electron-store-get-data");
        if (!appData) {
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        }
        ({ defaultCwd, appVersion } = appData);
      } else if (ipcMain2 && app2) {
        ({ defaultCwd, appVersion } = initDataListener());
      }
      options = {
        name: "config",
        ...options
      };
      if (!options.projectVersion) {
        options.projectVersion = appVersion;
      }
      if (options.cwd) {
        options.cwd = path2.isAbsolute(options.cwd) ? options.cwd : path2.join(defaultCwd, options.cwd);
      } else {
        options.cwd = defaultCwd;
      }
      options.configName = options.name;
      delete options.name;
      super(options);
    }
    static initRenderer() {
      initDataListener();
    }
    async openInEditor() {
      const error = await shell.openPath(this.path);
      if (error) {
        throw new Error(error);
      }
    }
  }
  electronStore = ElectronStore;
  return electronStore;
}
var electronStoreExports = /* @__PURE__ */ requireElectronStore();
const Store = /* @__PURE__ */ getDefaultExportFromCjs(electronStoreExports);
var src = { exports: {} };
var electronLogPreload = { exports: {} };
var hasRequiredElectronLogPreload;
function requireElectronLogPreload() {
  if (hasRequiredElectronLogPreload) return electronLogPreload.exports;
  hasRequiredElectronLogPreload = 1;
  (function(module) {
    let electron = {};
    try {
      electron = require("electron");
    } catch (e) {
    }
    if (electron.ipcRenderer) {
      initialize2(electron);
    }
    {
      module.exports = initialize2;
    }
    function initialize2({ contextBridge, ipcRenderer }) {
      if (!ipcRenderer) {
        return;
      }
      ipcRenderer.on("__ELECTRON_LOG_IPC__", (_, message) => {
        window.postMessage({ cmd: "message", ...message });
      });
      ipcRenderer.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((e) => console.error(new Error(
        `electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`
      )));
      const electronLog = {
        sendToMain(message) {
          try {
            ipcRenderer.send("__ELECTRON_LOG__", message);
          } catch (e) {
            console.error("electronLog.sendToMain ", e, "data:", message);
            ipcRenderer.send("__ELECTRON_LOG__", {
              cmd: "errorHandler",
              error: { message: e == null ? void 0 : e.message, stack: e == null ? void 0 : e.stack },
              errorName: "sendToMain"
            });
          }
        },
        log(...data) {
          electronLog.sendToMain({ data, level: "info" });
        }
      };
      for (const level of ["error", "warn", "info", "verbose", "debug", "silly"]) {
        electronLog[level] = (...data) => electronLog.sendToMain({
          data,
          level
        });
      }
      if (contextBridge && process.contextIsolated) {
        try {
          contextBridge.exposeInMainWorld("__electronLog", electronLog);
        } catch {
        }
      }
      if (typeof window === "object") {
        window.__electronLog = electronLog;
      } else {
        __electronLog = electronLog;
      }
    }
  })(electronLogPreload);
  return electronLogPreload.exports;
}
var renderer = { exports: {} };
var scope;
var hasRequiredScope;
function requireScope() {
  if (hasRequiredScope) return scope;
  hasRequiredScope = 1;
  scope = scopeFactory;
  function scopeFactory(logger) {
    return Object.defineProperties(scope2, {
      defaultLabel: { value: "", writable: true },
      labelPadding: { value: true, writable: true },
      maxLabelLength: { value: 0, writable: true },
      labelLength: {
        get() {
          switch (typeof scope2.labelPadding) {
            case "boolean":
              return scope2.labelPadding ? scope2.maxLabelLength : 0;
            case "number":
              return scope2.labelPadding;
            default:
              return 0;
          }
        }
      }
    });
    function scope2(label) {
      scope2.maxLabelLength = Math.max(scope2.maxLabelLength, label.length);
      const newScope = {};
      for (const level of logger.levels) {
        newScope[level] = (...d) => logger.logData(d, { level, scope: label });
      }
      newScope.log = newScope.info;
      return newScope;
    }
  }
  return scope;
}
var Buffering_1;
var hasRequiredBuffering;
function requireBuffering() {
  if (hasRequiredBuffering) return Buffering_1;
  hasRequiredBuffering = 1;
  class Buffering {
    constructor({ processMessage }) {
      this.processMessage = processMessage;
      this.buffer = [];
      this.enabled = false;
      this.begin = this.begin.bind(this);
      this.commit = this.commit.bind(this);
      this.reject = this.reject.bind(this);
    }
    addMessage(message) {
      this.buffer.push(message);
    }
    begin() {
      this.enabled = [];
    }
    commit() {
      this.enabled = false;
      this.buffer.forEach((item) => this.processMessage(item));
      this.buffer = [];
    }
    reject() {
      this.enabled = false;
      this.buffer = [];
    }
  }
  Buffering_1 = Buffering;
  return Buffering_1;
}
var Logger_1;
var hasRequiredLogger;
function requireLogger() {
  if (hasRequiredLogger) return Logger_1;
  hasRequiredLogger = 1;
  const scopeFactory = requireScope();
  const Buffering = requireBuffering();
  const _Logger = class _Logger {
    constructor({
      allowUnknownLevel = false,
      dependencies: dependencies2 = {},
      errorHandler,
      eventLogger,
      initializeFn,
      isDev = false,
      levels = ["error", "warn", "info", "verbose", "debug", "silly"],
      logId,
      transportFactories = {},
      variables
    } = {}) {
      __publicField(this, "dependencies", {});
      __publicField(this, "errorHandler", null);
      __publicField(this, "eventLogger", null);
      __publicField(this, "functions", {});
      __publicField(this, "hooks", []);
      __publicField(this, "isDev", false);
      __publicField(this, "levels", null);
      __publicField(this, "logId", null);
      __publicField(this, "scope", null);
      __publicField(this, "transports", {});
      __publicField(this, "variables", {});
      this.addLevel = this.addLevel.bind(this);
      this.create = this.create.bind(this);
      this.initialize = this.initialize.bind(this);
      this.logData = this.logData.bind(this);
      this.processMessage = this.processMessage.bind(this);
      this.allowUnknownLevel = allowUnknownLevel;
      this.buffering = new Buffering(this);
      this.dependencies = dependencies2;
      this.initializeFn = initializeFn;
      this.isDev = isDev;
      this.levels = levels;
      this.logId = logId;
      this.scope = scopeFactory(this);
      this.transportFactories = transportFactories;
      this.variables = variables || {};
      for (const name of this.levels) {
        this.addLevel(name, false);
      }
      this.log = this.info;
      this.functions.log = this.log;
      this.errorHandler = errorHandler;
      errorHandler == null ? void 0 : errorHandler.setOptions({ ...dependencies2, logFn: this.error });
      this.eventLogger = eventLogger;
      eventLogger == null ? void 0 : eventLogger.setOptions({ ...dependencies2, logger: this });
      for (const [name, factory] of Object.entries(transportFactories)) {
        this.transports[name] = factory(this, dependencies2);
      }
      _Logger.instances[logId] = this;
    }
    static getInstance({ logId }) {
      return this.instances[logId] || this.instances.default;
    }
    addLevel(level, index = this.levels.length) {
      if (index !== false) {
        this.levels.splice(index, 0, level);
      }
      this[level] = (...args) => this.logData(args, { level });
      this.functions[level] = this[level];
    }
    catchErrors(options) {
      this.processMessage(
        {
          data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
          level: "warn"
        },
        { transports: ["console"] }
      );
      return this.errorHandler.startCatching(options);
    }
    create(options) {
      if (typeof options === "string") {
        options = { logId: options };
      }
      return new _Logger({
        dependencies: this.dependencies,
        errorHandler: this.errorHandler,
        initializeFn: this.initializeFn,
        isDev: this.isDev,
        transportFactories: this.transportFactories,
        variables: { ...this.variables },
        ...options
      });
    }
    compareLevels(passLevel, checkLevel, levels = this.levels) {
      const pass = levels.indexOf(passLevel);
      const check = levels.indexOf(checkLevel);
      if (check === -1 || pass === -1) {
        return true;
      }
      return check <= pass;
    }
    initialize(options = {}) {
      this.initializeFn({ logger: this, ...this.dependencies, ...options });
    }
    logData(data, options = {}) {
      if (this.buffering.enabled) {
        this.buffering.addMessage({ data, ...options });
      } else {
        this.processMessage({ data, ...options });
      }
    }
    processMessage(message, { transports = this.transports } = {}) {
      if (message.cmd === "errorHandler") {
        this.errorHandler.handle(message.error, {
          errorName: message.errorName,
          processType: "renderer",
          showDialog: Boolean(message.showDialog)
        });
        return;
      }
      let level = message.level;
      if (!this.allowUnknownLevel) {
        level = this.levels.includes(message.level) ? message.level : "info";
      }
      const normalizedMessage = {
        date: /* @__PURE__ */ new Date(),
        logId: this.logId,
        ...message,
        level,
        variables: {
          ...this.variables,
          ...message.variables
        }
      };
      for (const [transName, transFn] of this.transportEntries(transports)) {
        if (typeof transFn !== "function" || transFn.level === false) {
          continue;
        }
        if (!this.compareLevels(transFn.level, message.level)) {
          continue;
        }
        try {
          const transformedMsg = this.hooks.reduce((msg, hook) => {
            return msg ? hook(msg, transFn, transName) : msg;
          }, normalizedMessage);
          if (transformedMsg) {
            transFn({ ...transformedMsg, data: [...transformedMsg.data] });
          }
        } catch (e) {
          this.processInternalErrorFn(e);
        }
      }
    }
    processInternalErrorFn(_e) {
    }
    transportEntries(transports = this.transports) {
      const transportArray = Array.isArray(transports) ? transports : Object.entries(transports);
      return transportArray.map((item) => {
        switch (typeof item) {
          case "string":
            return this.transports[item] ? [item, this.transports[item]] : null;
          case "function":
            return [item.name, item];
          default:
            return Array.isArray(item) ? item : null;
        }
      }).filter(Boolean);
    }
  };
  __publicField(_Logger, "instances", {});
  let Logger = _Logger;
  Logger_1 = Logger;
  return Logger_1;
}
var RendererErrorHandler_1;
var hasRequiredRendererErrorHandler;
function requireRendererErrorHandler() {
  if (hasRequiredRendererErrorHandler) return RendererErrorHandler_1;
  hasRequiredRendererErrorHandler = 1;
  const consoleError = console.error;
  class RendererErrorHandler {
    constructor({ logFn = null } = {}) {
      __publicField(this, "logFn", null);
      __publicField(this, "onError", null);
      __publicField(this, "showDialog", false);
      __publicField(this, "preventDefault", true);
      this.handleError = this.handleError.bind(this);
      this.handleRejection = this.handleRejection.bind(this);
      this.startCatching = this.startCatching.bind(this);
      this.logFn = logFn;
    }
    handle(error, {
      logFn = this.logFn,
      errorName = "",
      onError = this.onError,
      showDialog = this.showDialog
    } = {}) {
      try {
        if ((onError == null ? void 0 : onError({ error, errorName, processType: "renderer" })) !== false) {
          logFn({ error, errorName, showDialog });
        }
      } catch {
        consoleError(error);
      }
    }
    setOptions({ logFn, onError, preventDefault, showDialog }) {
      if (typeof logFn === "function") {
        this.logFn = logFn;
      }
      if (typeof onError === "function") {
        this.onError = onError;
      }
      if (typeof preventDefault === "boolean") {
        this.preventDefault = preventDefault;
      }
      if (typeof showDialog === "boolean") {
        this.showDialog = showDialog;
      }
    }
    startCatching({ onError, showDialog } = {}) {
      if (this.isActive) {
        return;
      }
      this.isActive = true;
      this.setOptions({ onError, showDialog });
      window.addEventListener("error", (event) => {
        var _a;
        this.preventDefault && ((_a = event.preventDefault) == null ? void 0 : _a.call(event));
        this.handleError(event.error || event);
      });
      window.addEventListener("unhandledrejection", (event) => {
        var _a;
        this.preventDefault && ((_a = event.preventDefault) == null ? void 0 : _a.call(event));
        this.handleRejection(event.reason || event);
      });
    }
    handleError(error) {
      this.handle(error, { errorName: "Unhandled" });
    }
    handleRejection(reason) {
      const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
      this.handle(error, { errorName: "Unhandled rejection" });
    }
  }
  RendererErrorHandler_1 = RendererErrorHandler;
  return RendererErrorHandler_1;
}
var console_1$1;
var hasRequiredConsole$1;
function requireConsole$1() {
  if (hasRequiredConsole$1) return console_1$1;
  hasRequiredConsole$1 = 1;
  console_1$1 = consoleTransportRendererFactory;
  const consoleMethods = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  function consoleTransportRendererFactory(logger) {
    return Object.assign(transport, {
      format: "{h}:{i}:{s}.{ms}{scope} › {text}",
      formatDataFn({
        data = [],
        date = /* @__PURE__ */ new Date(),
        format: format2 = transport.format,
        logId = logger.logId,
        scope: scope2 = logger.scopeName,
        ...message
      }) {
        if (typeof format2 === "function") {
          return format2({ ...message, data, date, logId, scope: scope2 });
        }
        if (typeof format2 !== "string") {
          return data;
        }
        data.unshift(format2);
        if (typeof data[1] === "string" && data[1].match(/%[1cdfiOos]/)) {
          data = [`${data[0]} ${data[1]}`, ...data.slice(2)];
        }
        data[0] = data[0].replace(/\{(\w+)}/g, (substring, name) => {
          var _a;
          switch (name) {
            case "level":
              return message.level;
            case "logId":
              return logId;
            case "scope":
              return scope2 ? ` (${scope2})` : "";
            case "text":
              return "";
            case "y":
              return date.getFullYear().toString(10);
            case "m":
              return (date.getMonth() + 1).toString(10).padStart(2, "0");
            case "d":
              return date.getDate().toString(10).padStart(2, "0");
            case "h":
              return date.getHours().toString(10).padStart(2, "0");
            case "i":
              return date.getMinutes().toString(10).padStart(2, "0");
            case "s":
              return date.getSeconds().toString(10).padStart(2, "0");
            case "ms":
              return date.getMilliseconds().toString(10).padStart(3, "0");
            case "iso":
              return date.toISOString();
            default: {
              return ((_a = message.variables) == null ? void 0 : _a[name]) || substring;
            }
          }
        }).trim();
        return data;
      },
      writeFn({ message: { level, data } }) {
        const consoleLogFn = consoleMethods[level] || consoleMethods.info;
        setTimeout(() => consoleLogFn(...data));
      }
    });
    function transport(message) {
      transport.writeFn({
        message: { ...message, data: transport.formatDataFn(message) }
      });
    }
  }
  return console_1$1;
}
var ipc$1;
var hasRequiredIpc$1;
function requireIpc$1() {
  if (hasRequiredIpc$1) return ipc$1;
  hasRequiredIpc$1 = 1;
  ipc$1 = ipcTransportRendererFactory;
  const RESTRICTED_TYPES = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
  function ipcTransportRendererFactory(logger) {
    return Object.assign(transport, {
      depth: 5,
      serializeFn(data, { depth = 5, seen = /* @__PURE__ */ new WeakSet() } = {}) {
        if (seen.has(data)) {
          return "[Circular]";
        }
        if (depth < 1) {
          if (isPrimitive(data)) {
            return data;
          }
          if (Array.isArray(data)) {
            return "[Array]";
          }
          return `[${typeof data}]`;
        }
        if (["function", "symbol"].includes(typeof data)) {
          return data.toString();
        }
        if (isPrimitive(data)) {
          return data;
        }
        if (RESTRICTED_TYPES.has(data.constructor)) {
          return `[${data.constructor.name}]`;
        }
        if (Array.isArray(data)) {
          return data.map((item) => transport.serializeFn(
            item,
            { depth: depth - 1, seen }
          ));
        }
        if (data instanceof Date) {
          return data.toISOString();
        }
        if (data instanceof Error) {
          return data.stack;
        }
        if (data instanceof Map) {
          return new Map(
            Array.from(data).map(([key, value]) => [
              transport.serializeFn(key, { depth: depth - 1, seen }),
              transport.serializeFn(value, { depth: depth - 1, seen })
            ])
          );
        }
        if (data instanceof Set) {
          return new Set(
            Array.from(data).map(
              (val) => transport.serializeFn(val, { depth: depth - 1, seen })
            )
          );
        }
        seen.add(data);
        return Object.fromEntries(
          Object.entries(data).map(
            ([key, value]) => [
              key,
              transport.serializeFn(value, { depth: depth - 1, seen })
            ]
          )
        );
      }
    });
    function transport(message) {
      if (!window.__electronLog) {
        logger.processMessage(
          {
            data: ["electron-log: logger isn't initialized in the main process"],
            level: "error"
          },
          { transports: ["console"] }
        );
        return;
      }
      try {
        __electronLog.sendToMain(transport.serializeFn(message, {
          depth: transport.depth
        }));
      } catch (e) {
        logger.transports.console({
          data: ["electronLog.transports.ipc", e, "data:", message.data],
          level: "error"
        });
      }
    }
  }
  function isPrimitive(value) {
    return Object(value) !== value;
  }
  return ipc$1;
}
var hasRequiredRenderer;
function requireRenderer() {
  if (hasRequiredRenderer) return renderer.exports;
  hasRequiredRenderer = 1;
  (function(module) {
    const Logger = requireLogger();
    const RendererErrorHandler = requireRendererErrorHandler();
    const transportConsole = requireConsole$1();
    const transportIpc = requireIpc$1();
    module.exports = createLogger();
    module.exports.Logger = Logger;
    module.exports.default = module.exports;
    function createLogger() {
      const logger = new Logger({
        allowUnknownLevel: true,
        errorHandler: new RendererErrorHandler(),
        initializeFn: () => {
        },
        logId: "default",
        transportFactories: {
          console: transportConsole,
          ipc: transportIpc
        },
        variables: {
          processType: "renderer"
        }
      });
      logger.errorHandler.setOptions({
        logFn({ error, errorName, showDialog }) {
          logger.transports.console({
            data: [errorName, error].filter(Boolean),
            level: "error"
          });
          logger.transports.ipc({
            cmd: "errorHandler",
            error: {
              cause: error == null ? void 0 : error.cause,
              code: error == null ? void 0 : error.code,
              name: error == null ? void 0 : error.name,
              message: error == null ? void 0 : error.message,
              stack: error == null ? void 0 : error.stack
            },
            errorName,
            logId: logger.logId,
            showDialog
          });
        }
      });
      if (typeof window === "object") {
        window.addEventListener("message", (event) => {
          const { cmd, logId, ...message } = event.data || {};
          const instance = Logger.getInstance({ logId });
          if (cmd === "message") {
            instance.processMessage(message, { transports: ["console"] });
          }
        });
      }
      return new Proxy(logger, {
        get(target, prop) {
          if (typeof target[prop] !== "undefined") {
            return target[prop];
          }
          return (...data) => logger.logData(data, { level: prop });
        }
      });
    }
  })(renderer);
  return renderer.exports;
}
var packageJson;
var hasRequiredPackageJson;
function requirePackageJson() {
  if (hasRequiredPackageJson) return packageJson;
  hasRequiredPackageJson = 1;
  const fs2 = require$$0;
  const path2 = require$$0$1;
  packageJson = {
    findAndReadPackageJson,
    tryReadJsonAt
  };
  function findAndReadPackageJson() {
    return tryReadJsonAt(getMainModulePath()) || tryReadJsonAt(extractPathFromArgs()) || tryReadJsonAt(process.resourcesPath, "app.asar") || tryReadJsonAt(process.resourcesPath, "app") || tryReadJsonAt(process.cwd()) || { name: void 0, version: void 0 };
  }
  function tryReadJsonAt(...searchPaths) {
    if (!searchPaths[0]) {
      return void 0;
    }
    try {
      const searchPath = path2.join(...searchPaths);
      const fileName = findUp2("package.json", searchPath);
      if (!fileName) {
        return void 0;
      }
      const json = JSON.parse(fs2.readFileSync(fileName, "utf8"));
      const name = (json == null ? void 0 : json.productName) || (json == null ? void 0 : json.name);
      if (!name || name.toLowerCase() === "electron") {
        return void 0;
      }
      if (name) {
        return { name, version: json == null ? void 0 : json.version };
      }
      return void 0;
    } catch (e) {
      return void 0;
    }
  }
  function findUp2(fileName, cwd) {
    let currentPath = cwd;
    while (true) {
      const parsedPath = path2.parse(currentPath);
      const root = parsedPath.root;
      const dir = parsedPath.dir;
      if (fs2.existsSync(path2.join(currentPath, fileName))) {
        return path2.resolve(path2.join(currentPath, fileName));
      }
      if (currentPath === root) {
        return null;
      }
      currentPath = dir;
    }
  }
  function extractPathFromArgs() {
    const matchedArgs = process.argv.filter((arg) => {
      return arg.indexOf("--user-data-dir=") === 0;
    });
    if (matchedArgs.length === 0 || typeof matchedArgs[0] !== "string") {
      return null;
    }
    const userDataDir = matchedArgs[0];
    return userDataDir.replace("--user-data-dir=", "");
  }
  function getMainModulePath() {
    var _a;
    try {
      return (_a = require.main) == null ? void 0 : _a.filename;
    } catch {
      return void 0;
    }
  }
  return packageJson;
}
var NodeExternalApi_1;
var hasRequiredNodeExternalApi;
function requireNodeExternalApi() {
  if (hasRequiredNodeExternalApi) return NodeExternalApi_1;
  hasRequiredNodeExternalApi = 1;
  const childProcess = require$$0$4;
  const os = require$$1;
  const path2 = require$$0$1;
  const packageJson2 = requirePackageJson();
  class NodeExternalApi {
    constructor() {
      __publicField(this, "appName");
      __publicField(this, "appPackageJson");
      __publicField(this, "platform", process.platform);
    }
    getAppLogPath(appName = this.getAppName()) {
      if (this.platform === "darwin") {
        return path2.join(this.getSystemPathHome(), "Library/Logs", appName);
      }
      return path2.join(this.getAppUserDataPath(appName), "logs");
    }
    getAppName() {
      var _a;
      const appName = this.appName || ((_a = this.getAppPackageJson()) == null ? void 0 : _a.name);
      if (!appName) {
        throw new Error(
          "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()"
        );
      }
      return appName;
    }
    /**
     * @private
     * @returns {undefined}
     */
    getAppPackageJson() {
      if (typeof this.appPackageJson !== "object") {
        this.appPackageJson = packageJson2.findAndReadPackageJson();
      }
      return this.appPackageJson;
    }
    getAppUserDataPath(appName = this.getAppName()) {
      return appName ? path2.join(this.getSystemPathAppData(), appName) : void 0;
    }
    getAppVersion() {
      var _a;
      return (_a = this.getAppPackageJson()) == null ? void 0 : _a.version;
    }
    getElectronLogPath() {
      return this.getAppLogPath();
    }
    getMacOsVersion() {
      const release = Number(os.release().split(".")[0]);
      if (release <= 19) {
        return `10.${release - 4}`;
      }
      return release - 9;
    }
    /**
     * @protected
     * @returns {string}
     */
    getOsVersion() {
      let osName = os.type().replace("_", " ");
      let osVersion = os.release();
      if (osName === "Darwin") {
        osName = "macOS";
        osVersion = this.getMacOsVersion();
      }
      return `${osName} ${osVersion}`;
    }
    /**
     * @return {PathVariables}
     */
    getPathVariables() {
      const appName = this.getAppName();
      const appVersion = this.getAppVersion();
      const self = this;
      return {
        appData: this.getSystemPathAppData(),
        appName,
        appVersion,
        get electronDefaultDir() {
          return self.getElectronLogPath();
        },
        home: this.getSystemPathHome(),
        libraryDefaultDir: this.getAppLogPath(appName),
        libraryTemplate: this.getAppLogPath("{appName}"),
        temp: this.getSystemPathTemp(),
        userData: this.getAppUserDataPath(appName)
      };
    }
    getSystemPathAppData() {
      const home = this.getSystemPathHome();
      switch (this.platform) {
        case "darwin": {
          return path2.join(home, "Library/Application Support");
        }
        case "win32": {
          return process.env.APPDATA || path2.join(home, "AppData/Roaming");
        }
        default: {
          return process.env.XDG_CONFIG_HOME || path2.join(home, ".config");
        }
      }
    }
    getSystemPathHome() {
      var _a;
      return ((_a = os.homedir) == null ? void 0 : _a.call(os)) || process.env.HOME;
    }
    getSystemPathTemp() {
      return os.tmpdir();
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: void 0,
        os: this.getOsVersion()
      };
    }
    isDev() {
      return process.env.NODE_ENV === "development" || process.env.ELECTRON_IS_DEV === "1";
    }
    isElectron() {
      return Boolean(process.versions.electron);
    }
    onAppEvent(_eventName, _handler) {
    }
    onAppReady(handler) {
      handler();
    }
    onEveryWebContentsEvent(eventName, handler) {
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(channel, listener) {
    }
    onIpcInvoke(channel, listener) {
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(url, logFunction = console.error) {
      const startMap = { darwin: "open", win32: "start", linux: "xdg-open" };
      const start = startMap[process.platform] || "xdg-open";
      childProcess.exec(`${start} ${url}`, {}, (err) => {
        if (err) {
          logFunction(err);
        }
      });
    }
    setAppName(appName) {
      this.appName = appName;
    }
    setPlatform(platform) {
      this.platform = platform;
    }
    setPreloadFileForSessions({
      filePath,
      // eslint-disable-line no-unused-vars
      includeFutureSession = true,
      // eslint-disable-line no-unused-vars
      getSessions = () => []
      // eslint-disable-line no-unused-vars
    }) {
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(channel, message) {
    }
    showErrorBox(title2, message) {
    }
  }
  NodeExternalApi_1 = NodeExternalApi;
  return NodeExternalApi_1;
}
var ElectronExternalApi_1;
var hasRequiredElectronExternalApi;
function requireElectronExternalApi() {
  if (hasRequiredElectronExternalApi) return ElectronExternalApi_1;
  hasRequiredElectronExternalApi = 1;
  const path2 = require$$0$1;
  const NodeExternalApi = requireNodeExternalApi();
  class ElectronExternalApi extends NodeExternalApi {
    /**
     * @param {object} options
     * @param {typeof Electron} [options.electron]
     */
    constructor({ electron } = {}) {
      super();
      /**
       * @type {typeof Electron}
       */
      __publicField(this, "electron");
      this.electron = electron;
    }
    getAppName() {
      var _a, _b;
      let appName;
      try {
        appName = this.appName || ((_a = this.electron.app) == null ? void 0 : _a.name) || ((_b = this.electron.app) == null ? void 0 : _b.getName());
      } catch {
      }
      return appName || super.getAppName();
    }
    getAppUserDataPath(appName) {
      return this.getPath("userData") || super.getAppUserDataPath(appName);
    }
    getAppVersion() {
      var _a;
      let appVersion;
      try {
        appVersion = (_a = this.electron.app) == null ? void 0 : _a.getVersion();
      } catch {
      }
      return appVersion || super.getAppVersion();
    }
    getElectronLogPath() {
      return this.getPath("logs") || super.getElectronLogPath();
    }
    /**
     * @private
     * @param {any} name
     * @returns {string|undefined}
     */
    getPath(name) {
      var _a;
      try {
        return (_a = this.electron.app) == null ? void 0 : _a.getPath(name);
      } catch {
        return void 0;
      }
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: `Electron ${process.versions.electron}`,
        os: this.getOsVersion()
      };
    }
    getSystemPathAppData() {
      return this.getPath("appData") || super.getSystemPathAppData();
    }
    isDev() {
      var _a;
      if (((_a = this.electron.app) == null ? void 0 : _a.isPackaged) !== void 0) {
        return !this.electron.app.isPackaged;
      }
      if (typeof process.execPath === "string") {
        const execFileName = path2.basename(process.execPath).toLowerCase();
        return execFileName.startsWith("electron");
      }
      return super.isDev();
    }
    onAppEvent(eventName, handler) {
      var _a;
      (_a = this.electron.app) == null ? void 0 : _a.on(eventName, handler);
      return () => {
        var _a2;
        (_a2 = this.electron.app) == null ? void 0 : _a2.off(eventName, handler);
      };
    }
    onAppReady(handler) {
      var _a, _b, _c;
      if ((_a = this.electron.app) == null ? void 0 : _a.isReady()) {
        handler();
      } else if ((_b = this.electron.app) == null ? void 0 : _b.once) {
        (_c = this.electron.app) == null ? void 0 : _c.once("ready", handler);
      } else {
        handler();
      }
    }
    onEveryWebContentsEvent(eventName, handler) {
      var _a, _b, _c;
      (_b = (_a = this.electron.webContents) == null ? void 0 : _a.getAllWebContents()) == null ? void 0 : _b.forEach((webContents) => {
        webContents.on(eventName, handler);
      });
      (_c = this.electron.app) == null ? void 0 : _c.on("web-contents-created", onWebContentsCreated);
      return () => {
        var _a2, _b2;
        (_a2 = this.electron.webContents) == null ? void 0 : _a2.getAllWebContents().forEach((webContents) => {
          webContents.off(eventName, handler);
        });
        (_b2 = this.electron.app) == null ? void 0 : _b2.off("web-contents-created", onWebContentsCreated);
      };
      function onWebContentsCreated(_, webContents) {
        webContents.on(eventName, handler);
      }
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(channel, listener) {
      var _a;
      (_a = this.electron.ipcMain) == null ? void 0 : _a.on(channel, listener);
    }
    onIpcInvoke(channel, listener) {
      var _a, _b;
      (_b = (_a = this.electron.ipcMain) == null ? void 0 : _a.handle) == null ? void 0 : _b.call(_a, channel, listener);
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(url, logFunction = console.error) {
      var _a;
      (_a = this.electron.shell) == null ? void 0 : _a.openExternal(url).catch(logFunction);
    }
    setPreloadFileForSessions({
      filePath,
      includeFutureSession = true,
      getSessions = () => {
        var _a;
        return [(_a = this.electron.session) == null ? void 0 : _a.defaultSession];
      }
    }) {
      for (const session of getSessions().filter(Boolean)) {
        setPreload(session);
      }
      if (includeFutureSession) {
        this.onAppEvent("session-created", (session) => {
          setPreload(session);
        });
      }
      function setPreload(session) {
        session.setPreloads([...session.getPreloads(), filePath]);
      }
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(channel, message) {
      var _a, _b;
      (_b = (_a = this.electron.BrowserWindow) == null ? void 0 : _a.getAllWindows()) == null ? void 0 : _b.forEach((wnd) => {
        var _a2;
        if (((_a2 = wnd.webContents) == null ? void 0 : _a2.isDestroyed()) === false) {
          wnd.webContents.send(channel, message);
        }
      });
    }
    showErrorBox(title2, message) {
      var _a;
      (_a = this.electron.dialog) == null ? void 0 : _a.showErrorBox(title2, message);
    }
  }
  ElectronExternalApi_1 = ElectronExternalApi;
  return ElectronExternalApi_1;
}
var initialize;
var hasRequiredInitialize;
function requireInitialize() {
  if (hasRequiredInitialize) return initialize;
  hasRequiredInitialize = 1;
  const fs2 = require$$0;
  const os = require$$1;
  const path2 = require$$0$1;
  const preloadInitializeFn = requireElectronLogPreload();
  initialize = {
    initialize({
      externalApi,
      getSessions,
      includeFutureSession,
      logger,
      preload = true,
      spyRendererConsole = false
    }) {
      externalApi.onAppReady(() => {
        try {
          if (preload) {
            initializePreload({
              externalApi,
              getSessions,
              includeFutureSession,
              preloadOption: preload
            });
          }
          if (spyRendererConsole) {
            initializeSpyRendererConsole({ externalApi, logger });
          }
        } catch (err) {
          logger.warn(err);
        }
      });
    }
  };
  function initializePreload({
    externalApi,
    getSessions,
    includeFutureSession,
    preloadOption
  }) {
    let preloadPath = typeof preloadOption === "string" ? preloadOption : void 0;
    try {
      preloadPath = path2.resolve(
        __dirname,
        "../renderer/electron-log-preload.js"
      );
    } catch {
    }
    if (!preloadPath || !fs2.existsSync(preloadPath)) {
      preloadPath = path2.join(
        externalApi.getAppUserDataPath() || os.tmpdir(),
        "electron-log-preload.js"
      );
      const preloadCode = `
      try {
        (${preloadInitializeFn.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
      fs2.writeFileSync(preloadPath, preloadCode, "utf8");
    }
    externalApi.setPreloadFileForSessions({
      filePath: preloadPath,
      includeFutureSession,
      getSessions
    });
  }
  function initializeSpyRendererConsole({ externalApi, logger }) {
    const levels = ["verbose", "info", "warning", "error"];
    externalApi.onEveryWebContentsEvent(
      "console-message",
      (event, level, message) => {
        logger.processMessage({
          data: [message],
          level: levels[level],
          variables: { processType: "renderer" }
        });
      }
    );
  }
  return initialize;
}
var ErrorHandler_1;
var hasRequiredErrorHandler;
function requireErrorHandler() {
  if (hasRequiredErrorHandler) return ErrorHandler_1;
  hasRequiredErrorHandler = 1;
  class ErrorHandler {
    constructor({
      externalApi,
      logFn = void 0,
      onError = void 0,
      showDialog = void 0
    } = {}) {
      __publicField(this, "externalApi");
      __publicField(this, "isActive", false);
      __publicField(this, "logFn");
      __publicField(this, "onError");
      __publicField(this, "showDialog", true);
      this.createIssue = this.createIssue.bind(this);
      this.handleError = this.handleError.bind(this);
      this.handleRejection = this.handleRejection.bind(this);
      this.setOptions({ externalApi, logFn, onError, showDialog });
      this.startCatching = this.startCatching.bind(this);
      this.stopCatching = this.stopCatching.bind(this);
    }
    handle(error, {
      logFn = this.logFn,
      onError = this.onError,
      processType = "browser",
      showDialog = this.showDialog,
      errorName = ""
    } = {}) {
      var _a;
      error = normalizeError(error);
      try {
        if (typeof onError === "function") {
          const versions = ((_a = this.externalApi) == null ? void 0 : _a.getVersions()) || {};
          const createIssue = this.createIssue;
          const result = onError({
            createIssue,
            error,
            errorName,
            processType,
            versions
          });
          if (result === false) {
            return;
          }
        }
        errorName ? logFn(errorName, error) : logFn(error);
        if (showDialog && !errorName.includes("rejection") && this.externalApi) {
          this.externalApi.showErrorBox(
            `A JavaScript error occurred in the ${processType} process`,
            error.stack
          );
        }
      } catch {
        console.error(error);
      }
    }
    setOptions({ externalApi, logFn, onError, showDialog }) {
      if (typeof externalApi === "object") {
        this.externalApi = externalApi;
      }
      if (typeof logFn === "function") {
        this.logFn = logFn;
      }
      if (typeof onError === "function") {
        this.onError = onError;
      }
      if (typeof showDialog === "boolean") {
        this.showDialog = showDialog;
      }
    }
    startCatching({ onError, showDialog } = {}) {
      if (this.isActive) {
        return;
      }
      this.isActive = true;
      this.setOptions({ onError, showDialog });
      process.on("uncaughtException", this.handleError);
      process.on("unhandledRejection", this.handleRejection);
    }
    stopCatching() {
      this.isActive = false;
      process.removeListener("uncaughtException", this.handleError);
      process.removeListener("unhandledRejection", this.handleRejection);
    }
    createIssue(pageUrl, queryParams) {
      var _a;
      (_a = this.externalApi) == null ? void 0 : _a.openUrl(
        `${pageUrl}?${new URLSearchParams(queryParams).toString()}`
      );
    }
    handleError(error) {
      this.handle(error, { errorName: "Unhandled" });
    }
    handleRejection(reason) {
      const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
      this.handle(error, { errorName: "Unhandled rejection" });
    }
  }
  function normalizeError(e) {
    if (e instanceof Error) {
      return e;
    }
    if (e && typeof e === "object") {
      if (e.message) {
        return Object.assign(new Error(e.message), e);
      }
      try {
        return new Error(JSON.stringify(e));
      } catch (serErr) {
        return new Error(`Couldn't normalize error ${String(e)}: ${serErr}`);
      }
    }
    return new Error(`Can't normalize error ${String(e)}`);
  }
  ErrorHandler_1 = ErrorHandler;
  return ErrorHandler_1;
}
var EventLogger_1;
var hasRequiredEventLogger;
function requireEventLogger() {
  if (hasRequiredEventLogger) return EventLogger_1;
  hasRequiredEventLogger = 1;
  class EventLogger {
    constructor(options = {}) {
      __publicField(this, "disposers", []);
      __publicField(this, "format", "{eventSource}#{eventName}:");
      __publicField(this, "formatters", {
        app: {
          "certificate-error": ({ args }) => {
            return this.arrayToObject(args.slice(1, 4), [
              "url",
              "error",
              "certificate"
            ]);
          },
          "child-process-gone": ({ args }) => {
            return args.length === 1 ? args[0] : args;
          },
          "render-process-gone": ({ args: [webContents, details] }) => {
            return details && typeof details === "object" ? { ...details, ...this.getWebContentsDetails(webContents) } : [];
          }
        },
        webContents: {
          "console-message": ({ args: [level, message, line, sourceId] }) => {
            if (level < 3) {
              return void 0;
            }
            return { message, source: `${sourceId}:${line}` };
          },
          "did-fail-load": ({ args }) => {
            return this.arrayToObject(args, [
              "errorCode",
              "errorDescription",
              "validatedURL",
              "isMainFrame",
              "frameProcessId",
              "frameRoutingId"
            ]);
          },
          "did-fail-provisional-load": ({ args }) => {
            return this.arrayToObject(args, [
              "errorCode",
              "errorDescription",
              "validatedURL",
              "isMainFrame",
              "frameProcessId",
              "frameRoutingId"
            ]);
          },
          "plugin-crashed": ({ args }) => {
            return this.arrayToObject(args, ["name", "version"]);
          },
          "preload-error": ({ args }) => {
            return this.arrayToObject(args, ["preloadPath", "error"]);
          }
        }
      });
      __publicField(this, "events", {
        app: {
          "certificate-error": true,
          "child-process-gone": true,
          "render-process-gone": true
        },
        webContents: {
          // 'console-message': true,
          "did-fail-load": true,
          "did-fail-provisional-load": true,
          "plugin-crashed": true,
          "preload-error": true,
          "unresponsive": true
        }
      });
      __publicField(this, "externalApi");
      __publicField(this, "level", "error");
      __publicField(this, "scope", "");
      this.setOptions(options);
    }
    setOptions({
      events,
      externalApi,
      level,
      logger,
      format: format2,
      formatters,
      scope: scope2
    }) {
      if (typeof events === "object") {
        this.events = events;
      }
      if (typeof externalApi === "object") {
        this.externalApi = externalApi;
      }
      if (typeof level === "string") {
        this.level = level;
      }
      if (typeof logger === "object") {
        this.logger = logger;
      }
      if (typeof format2 === "string" || typeof format2 === "function") {
        this.format = format2;
      }
      if (typeof formatters === "object") {
        this.formatters = formatters;
      }
      if (typeof scope2 === "string") {
        this.scope = scope2;
      }
    }
    startLogging(options = {}) {
      this.setOptions(options);
      this.disposeListeners();
      for (const eventName of this.getEventNames(this.events.app)) {
        this.disposers.push(
          this.externalApi.onAppEvent(eventName, (...handlerArgs) => {
            this.handleEvent({ eventSource: "app", eventName, handlerArgs });
          })
        );
      }
      for (const eventName of this.getEventNames(this.events.webContents)) {
        this.disposers.push(
          this.externalApi.onEveryWebContentsEvent(
            eventName,
            (...handlerArgs) => {
              this.handleEvent(
                { eventSource: "webContents", eventName, handlerArgs }
              );
            }
          )
        );
      }
    }
    stopLogging() {
      this.disposeListeners();
    }
    arrayToObject(array, fieldNames) {
      const obj = {};
      fieldNames.forEach((fieldName, index) => {
        obj[fieldName] = array[index];
      });
      if (array.length > fieldNames.length) {
        obj.unknownArgs = array.slice(fieldNames.length);
      }
      return obj;
    }
    disposeListeners() {
      this.disposers.forEach((disposer) => disposer());
      this.disposers = [];
    }
    formatEventLog({ eventName, eventSource, handlerArgs }) {
      var _a;
      const [event, ...args] = handlerArgs;
      if (typeof this.format === "function") {
        return this.format({ args, event, eventName, eventSource });
      }
      const formatter = (_a = this.formatters[eventSource]) == null ? void 0 : _a[eventName];
      let formattedArgs = args;
      if (typeof formatter === "function") {
        formattedArgs = formatter({ args, event, eventName, eventSource });
      }
      if (!formattedArgs) {
        return void 0;
      }
      const eventData = {};
      if (Array.isArray(formattedArgs)) {
        eventData.args = formattedArgs;
      } else if (typeof formattedArgs === "object") {
        Object.assign(eventData, formattedArgs);
      }
      if (eventSource === "webContents") {
        Object.assign(eventData, this.getWebContentsDetails(event == null ? void 0 : event.sender));
      }
      const title2 = this.format.replace("{eventSource}", eventSource === "app" ? "App" : "WebContents").replace("{eventName}", eventName);
      return [title2, eventData];
    }
    getEventNames(eventMap) {
      if (!eventMap || typeof eventMap !== "object") {
        return [];
      }
      return Object.entries(eventMap).filter(([_, listen]) => listen).map(([eventName]) => eventName);
    }
    getWebContentsDetails(webContents) {
      if (!(webContents == null ? void 0 : webContents.loadURL)) {
        return {};
      }
      try {
        return {
          webContents: {
            id: webContents.id,
            url: webContents.getURL()
          }
        };
      } catch {
        return {};
      }
    }
    handleEvent({ eventName, eventSource, handlerArgs }) {
      var _a;
      const log2 = this.formatEventLog({ eventName, eventSource, handlerArgs });
      if (log2) {
        const logFns = this.scope ? this.logger.scope(this.scope) : this.logger;
        (_a = logFns == null ? void 0 : logFns[this.level]) == null ? void 0 : _a.call(logFns, ...log2);
      }
    }
  }
  EventLogger_1 = EventLogger;
  return EventLogger_1;
}
var transform_1;
var hasRequiredTransform;
function requireTransform() {
  if (hasRequiredTransform) return transform_1;
  hasRequiredTransform = 1;
  transform_1 = { transform };
  function transform({
    logger,
    message,
    transport,
    initialData = (message == null ? void 0 : message.data) || [],
    transforms = transport == null ? void 0 : transport.transforms
  }) {
    return transforms.reduce((data, trans) => {
      if (typeof trans === "function") {
        return trans({ data, logger, message, transport });
      }
      return data;
    }, initialData);
  }
  return transform_1;
}
var format;
var hasRequiredFormat;
function requireFormat() {
  if (hasRequiredFormat) return format;
  hasRequiredFormat = 1;
  const { transform } = requireTransform();
  format = {
    concatFirstStringElements,
    formatScope,
    formatText,
    formatVariables,
    timeZoneFromOffset,
    format({ message, logger, transport, data = message == null ? void 0 : message.data }) {
      switch (typeof transport.format) {
        case "string": {
          return transform({
            message,
            logger,
            transforms: [formatVariables, formatScope, formatText],
            transport,
            initialData: [transport.format, ...data]
          });
        }
        case "function": {
          return transport.format({
            data,
            level: (message == null ? void 0 : message.level) || "info",
            logger,
            message,
            transport
          });
        }
        default: {
          return data;
        }
      }
    }
  };
  function concatFirstStringElements({ data }) {
    if (typeof data[0] !== "string" || typeof data[1] !== "string") {
      return data;
    }
    if (data[0].match(/%[1cdfiOos]/)) {
      return data;
    }
    return [`${data[0]} ${data[1]}`, ...data.slice(2)];
  }
  function timeZoneFromOffset(minutesOffset) {
    const minutesPositive = Math.abs(minutesOffset);
    const sign = minutesOffset > 0 ? "-" : "+";
    const hours = Math.floor(minutesPositive / 60).toString().padStart(2, "0");
    const minutes = (minutesPositive % 60).toString().padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
  }
  function formatScope({ data, logger, message }) {
    const { defaultLabel, labelLength } = (logger == null ? void 0 : logger.scope) || {};
    const template = data[0];
    let label = message.scope;
    if (!label) {
      label = defaultLabel;
    }
    let scopeText;
    if (label === "") {
      scopeText = labelLength > 0 ? "".padEnd(labelLength + 3) : "";
    } else if (typeof label === "string") {
      scopeText = ` (${label})`.padEnd(labelLength + 3);
    } else {
      scopeText = "";
    }
    data[0] = template.replace("{scope}", scopeText);
    return data;
  }
  function formatVariables({ data, message }) {
    let template = data[0];
    if (typeof template !== "string") {
      return data;
    }
    template = template.replace("{level}]", `${message.level}]`.padEnd(6, " "));
    const date = message.date || /* @__PURE__ */ new Date();
    data[0] = template.replace(/\{(\w+)}/g, (substring, name) => {
      var _a;
      switch (name) {
        case "level":
          return message.level || "info";
        case "logId":
          return message.logId;
        case "y":
          return date.getFullYear().toString(10);
        case "m":
          return (date.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return date.getDate().toString(10).padStart(2, "0");
        case "h":
          return date.getHours().toString(10).padStart(2, "0");
        case "i":
          return date.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return date.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return date.getMilliseconds().toString(10).padStart(3, "0");
        case "z":
          return timeZoneFromOffset(date.getTimezoneOffset());
        case "iso":
          return date.toISOString();
        default: {
          return ((_a = message.variables) == null ? void 0 : _a[name]) || substring;
        }
      }
    }).trim();
    return data;
  }
  function formatText({ data }) {
    const template = data[0];
    if (typeof template !== "string") {
      return data;
    }
    const textTplPosition = template.lastIndexOf("{text}");
    if (textTplPosition === template.length - 6) {
      data[0] = template.replace(/\s?{text}/, "");
      if (data[0] === "") {
        data.shift();
      }
      return data;
    }
    const templatePieces = template.split("{text}");
    let result = [];
    if (templatePieces[0] !== "") {
      result.push(templatePieces[0]);
    }
    result = result.concat(data.slice(1));
    if (templatePieces[1] !== "") {
      result.push(templatePieces[1]);
    }
    return result;
  }
  return format;
}
var object = { exports: {} };
var hasRequiredObject;
function requireObject() {
  if (hasRequiredObject) return object.exports;
  hasRequiredObject = 1;
  (function(module) {
    const util2 = require$$0$2;
    module.exports = {
      serialize,
      maxDepth({ data, transport, depth = (transport == null ? void 0 : transport.depth) ?? 6 }) {
        if (!data) {
          return data;
        }
        if (depth < 1) {
          if (Array.isArray(data)) return "[array]";
          if (typeof data === "object" && data) return "[object]";
          return data;
        }
        if (Array.isArray(data)) {
          return data.map((child) => module.exports.maxDepth({
            data: child,
            depth: depth - 1
          }));
        }
        if (typeof data !== "object") {
          return data;
        }
        if (data && typeof data.toISOString === "function") {
          return data;
        }
        if (data === null) {
          return null;
        }
        if (data instanceof Error) {
          return data;
        }
        const newJson = {};
        for (const i in data) {
          if (!Object.prototype.hasOwnProperty.call(data, i)) continue;
          newJson[i] = module.exports.maxDepth({
            data: data[i],
            depth: depth - 1
          });
        }
        return newJson;
      },
      toJSON({ data }) {
        return JSON.parse(JSON.stringify(data, createSerializer()));
      },
      toString({ data, transport }) {
        const inspectOptions = (transport == null ? void 0 : transport.inspectOptions) || {};
        const simplifiedData = data.map((item) => {
          if (item === void 0) {
            return void 0;
          }
          try {
            const str = JSON.stringify(item, createSerializer(), "  ");
            return str === void 0 ? void 0 : JSON.parse(str);
          } catch (e) {
            return item;
          }
        });
        return util2.formatWithOptions(inspectOptions, ...simplifiedData);
      }
    };
    function createSerializer(options = {}) {
      const seen = /* @__PURE__ */ new WeakSet();
      return function(key, value) {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return void 0;
          }
          seen.add(value);
        }
        return serialize(key, value, options);
      };
    }
    function serialize(key, value, options = {}) {
      const serializeMapAndSet = (options == null ? void 0 : options.serializeMapAndSet) !== false;
      if (value instanceof Error) {
        return value.stack;
      }
      if (!value) {
        return value;
      }
      if (typeof value === "function") {
        return `[function] ${value.toString()}`;
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      if (serializeMapAndSet && value instanceof Map && Object.fromEntries) {
        return Object.fromEntries(value);
      }
      if (serializeMapAndSet && value instanceof Set && Array.from) {
        return Array.from(value);
      }
      return value;
    }
  })(object);
  return object.exports;
}
var style;
var hasRequiredStyle;
function requireStyle() {
  if (hasRequiredStyle) return style;
  hasRequiredStyle = 1;
  style = {
    transformStyles,
    applyAnsiStyles({ data }) {
      return transformStyles(data, styleToAnsi, resetAnsiStyle);
    },
    removeStyles({ data }) {
      return transformStyles(data, () => "");
    }
  };
  const ANSI_COLORS = {
    unset: "\x1B[0m",
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m"
  };
  function styleToAnsi(style2) {
    const color = style2.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
    return ANSI_COLORS[color] || "";
  }
  function resetAnsiStyle(string) {
    return string + ANSI_COLORS.unset;
  }
  function transformStyles(data, onStyleFound, onStyleApplied) {
    const foundStyles = {};
    return data.reduce((result, item, index, array) => {
      if (foundStyles[index]) {
        return result;
      }
      if (typeof item === "string") {
        let valueIndex = index;
        let styleApplied = false;
        item = item.replace(/%[1cdfiOos]/g, (match) => {
          valueIndex += 1;
          if (match !== "%c") {
            return match;
          }
          const style2 = array[valueIndex];
          if (typeof style2 === "string") {
            foundStyles[valueIndex] = true;
            styleApplied = true;
            return onStyleFound(style2, item);
          }
          return match;
        });
        if (styleApplied && onStyleApplied) {
          item = onStyleApplied(item);
        }
      }
      result.push(item);
      return result;
    }, []);
  }
  return style;
}
var console_1;
var hasRequiredConsole;
function requireConsole() {
  if (hasRequiredConsole) return console_1;
  hasRequiredConsole = 1;
  const { concatFirstStringElements, format: format2 } = requireFormat();
  const { maxDepth, toJSON } = requireObject();
  const { applyAnsiStyles, removeStyles } = requireStyle();
  const { transform } = requireTransform();
  const consoleMethods = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  console_1 = consoleTransportFactory;
  const separator = process.platform === "win32" ? ">" : "›";
  const DEFAULT_FORMAT = `%c{h}:{i}:{s}.{ms}{scope}%c ${separator} {text}`;
  Object.assign(consoleTransportFactory, {
    DEFAULT_FORMAT
  });
  function consoleTransportFactory(logger) {
    return Object.assign(transport, {
      format: DEFAULT_FORMAT,
      level: "silly",
      transforms: [
        addTemplateColors,
        format2,
        formatStyles,
        concatFirstStringElements,
        maxDepth,
        toJSON
      ],
      useStyles: process.env.FORCE_STYLES,
      writeFn({ message }) {
        const consoleLogFn = consoleMethods[message.level] || consoleMethods.info;
        consoleLogFn(...message.data);
      }
    });
    function transport(message) {
      const data = transform({ logger, message, transport });
      transport.writeFn({
        message: { ...message, data }
      });
    }
  }
  function addTemplateColors({ data, message, transport }) {
    if (transport.format !== DEFAULT_FORMAT) {
      return data;
    }
    return [`color:${levelToStyle(message.level)}`, "color:unset", ...data];
  }
  function canUseStyles(useStyleValue, level) {
    if (typeof useStyleValue === "boolean") {
      return useStyleValue;
    }
    const useStderr = level === "error" || level === "warn";
    const stream = useStderr ? process.stderr : process.stdout;
    return stream && stream.isTTY;
  }
  function formatStyles(args) {
    const { message, transport } = args;
    const useStyles = canUseStyles(transport.useStyles, message.level);
    const nextTransform = useStyles ? applyAnsiStyles : removeStyles;
    return nextTransform(args);
  }
  function levelToStyle(level) {
    const map = { error: "red", warn: "yellow", info: "cyan", default: "unset" };
    return map[level] || map.default;
  }
  return console_1;
}
var File_1;
var hasRequiredFile$1;
function requireFile$1() {
  if (hasRequiredFile$1) return File_1;
  hasRequiredFile$1 = 1;
  const EventEmitter = require$$0$3;
  const fs2 = require$$0;
  const os = require$$1;
  class File extends EventEmitter {
    constructor({
      path: path2,
      writeOptions = { encoding: "utf8", flag: "a", mode: 438 },
      writeAsync = false
    }) {
      super();
      __publicField(this, "asyncWriteQueue", []);
      __publicField(this, "bytesWritten", 0);
      __publicField(this, "hasActiveAsyncWriting", false);
      __publicField(this, "path", null);
      __publicField(this, "initialSize");
      __publicField(this, "writeOptions", null);
      __publicField(this, "writeAsync", false);
      this.path = path2;
      this.writeOptions = writeOptions;
      this.writeAsync = writeAsync;
    }
    get size() {
      return this.getSize();
    }
    clear() {
      try {
        fs2.writeFileSync(this.path, "", {
          mode: this.writeOptions.mode,
          flag: "w"
        });
        this.reset();
        return true;
      } catch (e) {
        if (e.code === "ENOENT") {
          return true;
        }
        this.emit("error", e, this);
        return false;
      }
    }
    crop(bytesAfter) {
      try {
        const content = readFileSyncFromEnd(this.path, bytesAfter || 4096);
        this.clear();
        this.writeLine(`[log cropped]${os.EOL}${content}`);
      } catch (e) {
        this.emit(
          "error",
          new Error(`Couldn't crop file ${this.path}. ${e.message}`),
          this
        );
      }
    }
    getSize() {
      if (this.initialSize === void 0) {
        try {
          const stats = fs2.statSync(this.path);
          this.initialSize = stats.size;
        } catch (e) {
          this.initialSize = 0;
        }
      }
      return this.initialSize + this.bytesWritten;
    }
    increaseBytesWrittenCounter(text) {
      this.bytesWritten += Buffer.byteLength(text, this.writeOptions.encoding);
    }
    isNull() {
      return false;
    }
    nextAsyncWrite() {
      const file2 = this;
      if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0) {
        return;
      }
      const text = this.asyncWriteQueue.join("");
      this.asyncWriteQueue = [];
      this.hasActiveAsyncWriting = true;
      fs2.writeFile(this.path, text, this.writeOptions, (e) => {
        file2.hasActiveAsyncWriting = false;
        if (e) {
          file2.emit(
            "error",
            new Error(`Couldn't write to ${file2.path}. ${e.message}`),
            this
          );
        } else {
          file2.increaseBytesWrittenCounter(text);
        }
        file2.nextAsyncWrite();
      });
    }
    reset() {
      this.initialSize = void 0;
      this.bytesWritten = 0;
    }
    toString() {
      return this.path;
    }
    writeLine(text) {
      text += os.EOL;
      if (this.writeAsync) {
        this.asyncWriteQueue.push(text);
        this.nextAsyncWrite();
        return;
      }
      try {
        fs2.writeFileSync(this.path, text, this.writeOptions);
        this.increaseBytesWrittenCounter(text);
      } catch (e) {
        this.emit(
          "error",
          new Error(`Couldn't write to ${this.path}. ${e.message}`),
          this
        );
      }
    }
  }
  File_1 = File;
  function readFileSyncFromEnd(filePath, bytesCount) {
    const buffer = Buffer.alloc(bytesCount);
    const stats = fs2.statSync(filePath);
    const readLength = Math.min(stats.size, bytesCount);
    const offset = Math.max(0, stats.size - bytesCount);
    const fd = fs2.openSync(filePath, "r");
    const totalBytes = fs2.readSync(fd, buffer, 0, readLength, offset);
    fs2.closeSync(fd);
    return buffer.toString("utf8", 0, totalBytes);
  }
  return File_1;
}
var NullFile_1;
var hasRequiredNullFile;
function requireNullFile() {
  if (hasRequiredNullFile) return NullFile_1;
  hasRequiredNullFile = 1;
  const File = requireFile$1();
  class NullFile extends File {
    clear() {
    }
    crop() {
    }
    getSize() {
      return 0;
    }
    isNull() {
      return true;
    }
    writeLine() {
    }
  }
  NullFile_1 = NullFile;
  return NullFile_1;
}
var FileRegistry_1;
var hasRequiredFileRegistry;
function requireFileRegistry() {
  if (hasRequiredFileRegistry) return FileRegistry_1;
  hasRequiredFileRegistry = 1;
  const EventEmitter = require$$0$3;
  const fs2 = require$$0;
  const path2 = require$$0$1;
  const File = requireFile$1();
  const NullFile = requireNullFile();
  class FileRegistry extends EventEmitter {
    constructor() {
      super();
      __publicField(this, "store", {});
      this.emitError = this.emitError.bind(this);
    }
    /**
     * Provide a File object corresponding to the filePath
     * @param {string} filePath
     * @param {WriteOptions} [writeOptions]
     * @param {boolean} [writeAsync]
     * @return {File}
     */
    provide({ filePath, writeOptions = {}, writeAsync = false }) {
      let file2;
      try {
        filePath = path2.resolve(filePath);
        if (this.store[filePath]) {
          return this.store[filePath];
        }
        file2 = this.createFile({ filePath, writeOptions, writeAsync });
      } catch (e) {
        file2 = new NullFile({ path: filePath });
        this.emitError(e, file2);
      }
      file2.on("error", this.emitError);
      this.store[filePath] = file2;
      return file2;
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @param {boolean} async
     * @return {File}
     * @private
     */
    createFile({ filePath, writeOptions, writeAsync }) {
      this.testFileWriting({ filePath, writeOptions });
      return new File({ path: filePath, writeOptions, writeAsync });
    }
    /**
     * @param {Error} error
     * @param {File} file
     * @private
     */
    emitError(error, file2) {
      this.emit("error", error, file2);
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @private
     */
    testFileWriting({ filePath, writeOptions }) {
      fs2.mkdirSync(path2.dirname(filePath), { recursive: true });
      fs2.writeFileSync(filePath, "", { flag: "a", mode: writeOptions.mode });
    }
  }
  FileRegistry_1 = FileRegistry;
  return FileRegistry_1;
}
var file;
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  const fs2 = require$$0;
  const os = require$$1;
  const path2 = require$$0$1;
  const FileRegistry = requireFileRegistry();
  const { transform } = requireTransform();
  const { removeStyles } = requireStyle();
  const {
    format: format2,
    concatFirstStringElements
  } = requireFormat();
  const { toString } = requireObject();
  file = fileTransportFactory;
  const globalRegistry = new FileRegistry();
  function fileTransportFactory(logger, { registry = globalRegistry, externalApi } = {}) {
    let pathVariables;
    if (registry.listenerCount("error") < 1) {
      registry.on("error", (e, file2) => {
        logConsole(`Can't write to ${file2}`, e);
      });
    }
    return Object.assign(transport, {
      fileName: getDefaultFileName(logger.variables.processType),
      format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
      getFile,
      inspectOptions: { depth: 5 },
      level: "silly",
      maxSize: 1024 ** 2,
      readAllLogs,
      sync: true,
      transforms: [removeStyles, format2, concatFirstStringElements, toString],
      writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
      archiveLogFn(file2) {
        const oldPath = file2.toString();
        const inf = path2.parse(oldPath);
        try {
          fs2.renameSync(oldPath, path2.join(inf.dir, `${inf.name}.old${inf.ext}`));
        } catch (e) {
          logConsole("Could not rotate log", e);
          const quarterOfMaxSize = Math.round(transport.maxSize / 4);
          file2.crop(Math.min(quarterOfMaxSize, 256 * 1024));
        }
      },
      resolvePathFn(vars) {
        return path2.join(vars.libraryDefaultDir, vars.fileName);
      },
      setAppName(name) {
        logger.dependencies.externalApi.setAppName(name);
      }
    });
    function transport(message) {
      const file2 = getFile(message);
      const needLogRotation = transport.maxSize > 0 && file2.size > transport.maxSize;
      if (needLogRotation) {
        transport.archiveLogFn(file2);
        file2.reset();
      }
      const content = transform({ logger, message, transport });
      file2.writeLine(content);
    }
    function initializeOnFirstAccess() {
      if (pathVariables) {
        return;
      }
      pathVariables = Object.create(
        Object.prototype,
        {
          ...Object.getOwnPropertyDescriptors(
            externalApi.getPathVariables()
          ),
          fileName: {
            get() {
              return transport.fileName;
            },
            enumerable: true
          }
        }
      );
      if (typeof transport.archiveLog === "function") {
        transport.archiveLogFn = transport.archiveLog;
        logConsole("archiveLog is deprecated. Use archiveLogFn instead");
      }
      if (typeof transport.resolvePath === "function") {
        transport.resolvePathFn = transport.resolvePath;
        logConsole("resolvePath is deprecated. Use resolvePathFn instead");
      }
    }
    function logConsole(message, error = null, level = "error") {
      const data = [`electron-log.transports.file: ${message}`];
      if (error) {
        data.push(error);
      }
      logger.transports.console({ data, date: /* @__PURE__ */ new Date(), level });
    }
    function getFile(msg) {
      initializeOnFirstAccess();
      const filePath = transport.resolvePathFn(pathVariables, msg);
      return registry.provide({
        filePath,
        writeAsync: !transport.sync,
        writeOptions: transport.writeOptions
      });
    }
    function readAllLogs({ fileFilter = (f) => f.endsWith(".log") } = {}) {
      initializeOnFirstAccess();
      const logsPath = path2.dirname(transport.resolvePathFn(pathVariables));
      if (!fs2.existsSync(logsPath)) {
        return [];
      }
      return fs2.readdirSync(logsPath).map((fileName) => path2.join(logsPath, fileName)).filter(fileFilter).map((logPath) => {
        try {
          return {
            path: logPath,
            lines: fs2.readFileSync(logPath, "utf8").split(os.EOL)
          };
        } catch {
          return null;
        }
      }).filter(Boolean);
    }
  }
  function getDefaultFileName(processType = process.type) {
    switch (processType) {
      case "renderer":
        return "renderer.log";
      case "worker":
        return "worker.log";
      default:
        return "main.log";
    }
  }
  return file;
}
var ipc;
var hasRequiredIpc;
function requireIpc() {
  if (hasRequiredIpc) return ipc;
  hasRequiredIpc = 1;
  const { maxDepth, toJSON } = requireObject();
  const { transform } = requireTransform();
  ipc = ipcTransportFactory;
  function ipcTransportFactory(logger, { externalApi }) {
    Object.assign(transport, {
      depth: 3,
      eventId: "__ELECTRON_LOG_IPC__",
      level: logger.isDev ? "silly" : false,
      transforms: [toJSON, maxDepth]
    });
    return (externalApi == null ? void 0 : externalApi.isElectron()) ? transport : void 0;
    function transport(message) {
      var _a;
      if (((_a = message == null ? void 0 : message.variables) == null ? void 0 : _a.processType) === "renderer") {
        return;
      }
      externalApi == null ? void 0 : externalApi.sendIpc(transport.eventId, {
        ...message,
        data: transform({ logger, message, transport })
      });
    }
  }
  return ipc;
}
var remote;
var hasRequiredRemote;
function requireRemote() {
  if (hasRequiredRemote) return remote;
  hasRequiredRemote = 1;
  const http = require$$0$5;
  const https = require$$1$2;
  const { transform } = requireTransform();
  const { removeStyles } = requireStyle();
  const { toJSON, maxDepth } = requireObject();
  remote = remoteTransportFactory;
  function remoteTransportFactory(logger) {
    return Object.assign(transport, {
      client: { name: "electron-application" },
      depth: 6,
      level: false,
      requestOptions: {},
      transforms: [removeStyles, toJSON, maxDepth],
      makeBodyFn({ message }) {
        return JSON.stringify({
          client: transport.client,
          data: message.data,
          date: message.date.getTime(),
          level: message.level,
          scope: message.scope,
          variables: message.variables
        });
      },
      processErrorFn({ error }) {
        logger.processMessage(
          {
            data: [`electron-log: can't POST ${transport.url}`, error],
            level: "warn"
          },
          { transports: ["console", "file"] }
        );
      },
      sendRequestFn({ serverUrl, requestOptions, body }) {
        const httpTransport = serverUrl.startsWith("https:") ? https : http;
        const request = httpTransport.request(serverUrl, {
          method: "POST",
          ...requestOptions,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": body.length,
            ...requestOptions.headers
          }
        });
        request.write(body);
        request.end();
        return request;
      }
    });
    function transport(message) {
      if (!transport.url) {
        return;
      }
      const body = transport.makeBodyFn({
        logger,
        message: { ...message, data: transform({ logger, message, transport }) },
        transport
      });
      const request = transport.sendRequestFn({
        serverUrl: transport.url,
        requestOptions: transport.requestOptions,
        body: Buffer.from(body, "utf8")
      });
      request.on("error", (error) => transport.processErrorFn({
        error,
        logger,
        message,
        request,
        transport
      }));
    }
  }
  return remote;
}
var createDefaultLogger_1;
var hasRequiredCreateDefaultLogger;
function requireCreateDefaultLogger() {
  if (hasRequiredCreateDefaultLogger) return createDefaultLogger_1;
  hasRequiredCreateDefaultLogger = 1;
  const Logger = requireLogger();
  const ErrorHandler = requireErrorHandler();
  const EventLogger = requireEventLogger();
  const transportConsole = requireConsole();
  const transportFile = requireFile();
  const transportIpc = requireIpc();
  const transportRemote = requireRemote();
  createDefaultLogger_1 = createDefaultLogger;
  function createDefaultLogger({ dependencies: dependencies2, initializeFn }) {
    var _a;
    const defaultLogger = new Logger({
      dependencies: dependencies2,
      errorHandler: new ErrorHandler(),
      eventLogger: new EventLogger(),
      initializeFn,
      isDev: (_a = dependencies2.externalApi) == null ? void 0 : _a.isDev(),
      logId: "default",
      transportFactories: {
        console: transportConsole,
        file: transportFile,
        ipc: transportIpc,
        remote: transportRemote
      },
      variables: {
        processType: "main"
      }
    });
    defaultLogger.default = defaultLogger;
    defaultLogger.Logger = Logger;
    defaultLogger.processInternalErrorFn = (e) => {
      defaultLogger.transports.console.writeFn({
        message: {
          data: ["Unhandled electron-log error", e],
          level: "error"
        }
      });
    };
    return defaultLogger;
  }
  return createDefaultLogger_1;
}
var main;
var hasRequiredMain;
function requireMain() {
  if (hasRequiredMain) return main;
  hasRequiredMain = 1;
  const electron = require$$1$1;
  const ElectronExternalApi = requireElectronExternalApi();
  const { initialize: initialize2 } = requireInitialize();
  const createDefaultLogger = requireCreateDefaultLogger();
  const externalApi = new ElectronExternalApi({ electron });
  const defaultLogger = createDefaultLogger({
    dependencies: { externalApi },
    initializeFn: initialize2
  });
  main = defaultLogger;
  externalApi.onIpc("__ELECTRON_LOG__", (_, message) => {
    if (message.scope) {
      defaultLogger.Logger.getInstance(message).scope(message.scope);
    }
    const date = new Date(message.date);
    processMessage({
      ...message,
      date: date.getTime() ? date : /* @__PURE__ */ new Date()
    });
  });
  externalApi.onIpcInvoke("__ELECTRON_LOG__", (_, { cmd = "", logId }) => {
    switch (cmd) {
      case "getOptions": {
        const logger = defaultLogger.Logger.getInstance({ logId });
        return {
          levels: logger.levels,
          logId
        };
      }
      default: {
        processMessage({ data: [`Unknown cmd '${cmd}'`], level: "error" });
        return {};
      }
    }
  });
  function processMessage(message) {
    var _a;
    (_a = defaultLogger.Logger.getInstance(message)) == null ? void 0 : _a.processMessage(message);
  }
  return main;
}
var node;
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node;
  hasRequiredNode = 1;
  const NodeExternalApi = requireNodeExternalApi();
  const createDefaultLogger = requireCreateDefaultLogger();
  const externalApi = new NodeExternalApi();
  const defaultLogger = createDefaultLogger({
    dependencies: { externalApi }
  });
  node = defaultLogger;
  return node;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src.exports;
  hasRequiredSrc = 1;
  const isRenderer = typeof process === "undefined" || (process.type === "renderer" || process.type === "worker");
  const isMain = typeof process === "object" && process.type === "browser";
  if (isRenderer) {
    requireElectronLogPreload();
    src.exports = requireRenderer();
  } else if (isMain) {
    src.exports = requireMain();
  } else {
    src.exports = requireNode();
  }
  return src.exports;
}
var srcExports = requireSrc();
const log = /* @__PURE__ */ getDefaultExportFromCjs(srcExports);
const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAA0cWNhQlgAADRxanVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAANEtqdW1iAAAATWp1bWRjMm1hABEAEIAAAKoAOJtxA2Fkb2JlOnVybjp1dWlkOjA4N2I0N2EyLWQ3MTAtNGI0MC1hYjY2LWMyMDIyZmQ4NzkwZgAAAAGzanVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAAAA12p1bWIAAAAmanVtZGNib3IAEQAQgAAAqgA4m3EDYzJwYS5hY3Rpb25zAAAAAKljYm9yoWdhY3Rpb25zgaNmYWN0aW9ua2MycGEuZWRpdGVkbXNvZnR3YXJlQWdlbnRtQWRvYmUgRmlyZWZseXFkaWdpdGFsU291cmNlVHlwZXhTaHR0cDovL2N2LmlwdGMub3JnL25ld3Njb2Rlcy9kaWdpdGFsc291cmNldHlwZS9jb21wb3NpdGVXaXRoVHJhaW5lZEFsZ29yaXRobWljTWVkaWEAAACranVtYgAAAChqdW1kY2JvcgARABCAAACqADibcQNjMnBhLmhhc2guZGF0YQAAAAB7Y2JvcqVqZXhjbHVzaW9uc4GiZXN0YXJ0GCFmbGVuZ3RoGTR9ZG5hbWVuanVtYmYgbWFuaWZlc3RjYWxnZnNoYTI1NmRoYXNoWCAe+HGorNWZULEDy5ZsJZ9P0XZ+J9U8aFANZFqYNDcSqWNwYWRIAAAAAAAAAAAAAAIzanVtYgAAACRqdW1kYzJjbAARABCAAACqADibcQNjMnBhLmNsYWltAAAAAgdjYm9yqGhkYzp0aXRsZW9HZW5lcmF0ZWQgSW1hZ2VpZGM6Zm9ybWF0aWltYWdlL3BuZ2ppbnN0YW5jZUlEeCx4bXA6aWlkOmIxMzNhNmUwLTZlOTAtNGFmZi1hMjMyLWU3MWIxNjkyOTRlMm9jbGFpbV9nZW5lcmF0b3J4N0Fkb2JlIFBob3Rvc2hvcC8yNi4wLjAgYWRvYmVfYzJwYS8wLjEyLjIgYzJwYS1ycy8wLjMyLjV0Y2xhaW1fZ2VuZXJhdG9yX2luZm+Bv2RuYW1lb0Fkb2JlIFBob3Rvc2hvcGd2ZXJzaW9uZjI2LjAuMG9jb20uYWRvYmUuYnVpbGR4GTIwMjQwOTI3LnIuMjYgYTczM2ZkYSB3aW7/aXNpZ25hdHVyZXgZc2VsZiNqdW1iZj1jMnBhLnNpZ25hdHVyZWphc3NlcnRpb25zgqJjdXJseCdzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmFjdGlvbnNkaGFzaFggSmnBvf+o3kEweL4k7cz4MTrB0WSVNFZxoA1rBrM31K+iY3VybHgpc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5oYXNoLmRhdGFkaGFzaFggMMwIxcPdpSbSdWWG+rSWNTiR8C5cvtkaeJipN8++cghjYWxnZnNoYTI1NgAAMBBqdW1iAAAAKGp1bWRjMmNzABEAEIAAAKoAOJtxA2MycGEuc2lnbmF0dXJlAAAAL+BjYm9y0oRZDO+iATgkGCGCWQY9MIIGOTCCBCGgAwIBAgIQFY3/J6wj0rglS05jNx4dnjANBgkqhkiG9w0BAQsFADB1MQswCQYDVQQGEwJVUzEjMCEGA1UEChMaQWRvYmUgU3lzdGVtcyBJbmNvcnBvcmF0ZWQxHTAbBgNVBAsTFEFkb2JlIFRydXN0IFNlcnZpY2VzMSIwIAYDVQQDExlBZG9iZSBQcm9kdWN0IFNlcnZpY2VzIEczMB4XDTI0MTAxNTAwMDAwMFoXDTI1MTAxNTIzNTk1OVowgasxEzARBgNVBAMMCkFkb2JlIEMyUEExKDAmBgNVBAsMH0NvbnRlbnQgQXV0aGVudGljaXR5IEluaXRpYXRpdmUxEzARBgNVBAoMCkFkb2JlIEluYy4xETAPBgNVBAcMCFNhbiBKb3NlMRMwEQYDVQQIDApDYWxpZm9ybmlhMQswCQYDVQQGEwJVUzEgMB4GCSqGSIb3DQEJARYRY2FpLW9wc0BhZG9iZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDDEMGB0H09cukxc/Dmg2BiQVYM8/VpJ+2H1Nk8g0605CWGnW/iH6EzFlYWORndElG6hIGuxJJgFoR+IMwqKyL+w7G4UcoFX/+XWu/dKuOuLEA1ciWqMZ0hjJ1oxoVr/mi8XP+bj5JTPRxxjOrD69IDO5HJIaemCbwaaP5IQlwv8YgfOpT1tTLc2yLNjahjbzKPfatuQ6p4ANIznU6ogkqWgQEUV7HMy6fOlT4rawuqF6hHwUkxpHR8Zdr+CpHOGSIEWHBSEs9L2zr5MKfPT1RkyVdt0b+IUqPdQ8VQOOqHTC0WBzPbgOtSVpZ6KW0oei7KYEe6KvO+Y4bRW1I96nE5AgMBAAGjggGMMIIBiDAMBgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIHgDAeBgNVHSUEFzAVBgkqhkiG9y8BAQwGCCsGAQUFBwMEMIGOBgNVHSAEgYYwgYMwgYAGCSqGSIb3LwECAzBzMHEGCCsGAQUFBwICMGUMY1lvdSBhcmUgbm90IHBlcm1pdHRlZCB0byB1c2UgdGhpcyBMaWNlbnNlIENlcnRpZmljYXRlIGV4Y2VwdCBhcyBwZXJtaXR0ZWQgYnkgdGhlIGxpY2Vuc2UgYWdyZWVtZW50LjBdBgNVHR8EVjBUMFKgUKBOhkxodHRwOi8vcGtpLWNybC5zeW1hdXRoLmNvbS9jYV83YTVjM2EwYzczMTE3NDA2YWRkMTkzMTJiYzFiYzIzZi9MYXRlc3RDUkwuY3JsMDcGCCsGAQUFBwEBBCswKTAnBggrBgEFBQcwAYYbaHR0cDovL3BraS1vY3NwLnN5bWF1dGguY29tMB8GA1UdIwQYMBaAFFcpejJNzP7kNU7AHyRzznNTq99qMA0GCSqGSIb3DQEBCwUAA4ICAQCquXoUtD5z0thp/SKDJOASs0v1eaaJ6JPeiEoV68ncE3uRaRkPXOdtXDdedfm2BBoqr4CJIKV03FgQqpT5Gr0uvboYaCUFIDSz8OzaTD7YuWdOaiMAcIfcK9VFuEYcetqyGad+DCYXVNKRpaTs3ESFu33BCiIQyQtJB4zhLgK77XvoXMR3L7POQORFap5I5A7+obZZG2j+8irfQQJ/q/oW1rMkjUJYiqEErmgmKhI1suwJUmFqvdRxr0PXW6N5lbiTaM8KyfOuJOYWpV+13eTZJdRCDvBBxBxd8oEi1Zm3zO2fQhihnMlrXH2X129coAm82wOjPi4N6tLzP2vMuwRC/MvXI9tOnj7/qZNMBayhoO2aRmCbdf6x989fdfMwWZ/MgeJh9SNrmcorZuzg/vW2K3/VT8UPbF2WnNlK6lGoIwbP5RN5cjwis3llH/4XytKyZEBK2OeCDP/AO5zBwOUltjj9EqrcGsCLgtqYswh/Cj91svnlMOUg53scJ+ZKBptzVY7QqOLctb9Vmc/1UbxaJQb5aq03U5AgBmYVQ5Z1dAYtqD4jU5pnUFckM2wmJdyDZMY0FIQ+jjgCR+f0zMUYrIHlS6sw3g0fSqVqaGuEqJXT5vvcWPHffQ/9+vEGbPHk2kBCE0qSzH4XjPVLwDLWjZMEiSR4AVsPPLx/8XG7K1kGpTCCBqEwggSJoAMCAQICEAyotlR7iebSBol1zYubieIwDQYJKoZIhvcNAQELBQAwbDELMAkGA1UEBhMCVVMxIzAhBgNVBAoTGkFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkMR0wGwYDVQQLExRBZG9iZSBUcnVzdCBTZXJ2aWNlczEZMBcGA1UEAxMQQWRvYmUgUm9vdCBDQSBHMjAeFw0xNjExMjkwMDAwMDBaFw00MTExMjgyMzU5NTlaMHUxCzAJBgNVBAYTAlVTMSMwIQYDVQQKExpBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZDEdMBsGA1UECxMUQWRvYmUgVHJ1c3QgU2VydmljZXMxIjAgBgNVBAMTGUFkb2JlIFByb2R1Y3QgU2VydmljZXMgRzMwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQC3Hy69vQmzXEhs/gyDrmwB6lF4JaSAPomnsbKIZNr2iXaB+fkd85X8eJiNmI7P5O4cVT4Nc1p3zrESqBV4ZUyW8gcZ78QdwoHG8QNd2VNcHnMgSR+XT9Iafsnq9Nfww3Jt9KL3l5ANQ5n1+MJqr48EWNLll942bOL/JH4ywDSMoqhZqtJEIUUUGlQVBZ8CAvJc7LE6ddA5C52PE2Ppa7RfQgHXf4gfXVZwpxYRZcziPiOHqEvLb0J3cShUbejFxV6cwX8QyAPa1ePHg1RtM0HX+D34xHo3DkyGnmT+Ddq00TEDGG26AL5PdINKFIQl+zaq6KJFQe1fdGE5wrWzU4mBPmzaz3EbLn+7FWlwAhorYqIMldbfHE3ydc+aTU1JW7+bG19qmvhO9IluGtTtQDeqFBj2fg6faxsfVfVPD7stN6TwoIDlkOCE4RE+Iin8m3z3eqi/VsTmsmRqBxWDRaqOHz02EJoEDxXJG3ei+UbIIp01XZQvdufm90WxOTuqqan2ZqTPX9K5VdjEh/ovr7xFc5q1dZo+Sa5y4sTVM854/tLU3klOgUKzzSXYPYS3GhBcYJHjwr9xNRHnNX99D6F0g7OijScWfvtjxh13aTv/H0ETvymah4yfDpVdh9cK5YSCPqnuOlsujFAyhYwJXOWDvZZU2EkWVLDhoPx9zp7N4QIDAQABo4IBNDCCATAwEgYDVR0TAQH/BAgwBgEB/wIBADA1BgNVHR8ELjAsMCqgKKAmhiRodHRwOi8vY3JsLmFkb2JlLmNvbS9hZG9iZXJvb3RnMi5jcmwwDgYDVR0PAQH/BAQDAgEGMBQGA1UdJQQNMAsGCSqGSIb3LwEBBzBXBgNVHSAEUDBOMEwGCSqGSIb3LwECAzA/MD0GCCsGAQUFBwIBFjFodHRwczovL3d3dy5hZG9iZS5jb20vbWlzYy9wa2kvcHJvZF9zdmNlX2Nwcy5odG1sMCQGA1UdEQQdMBukGTAXMRUwEwYDVQQDEwxTWU1DLTQwOTYtMzMwHQYDVR0OBBYEFFcpejJNzP7kNU7AHyRzznNTq99qMB8GA1UdIwQYMBaAFKYc4W1UJEyoj0hyv26pjNXk7DHUMA0GCSqGSIb3DQEBCwUAA4ICAQBxzuUHjKbcLdzI4DtlXgCSgZXrlSAkr59pOF3JfPG42qVNAGU7JcEYXJ6+WbfcGwY7WYMl+jO7IvJPb7shXFYW9bnJgxX7lLU14KExchmcLNY1ee6IhBJ2Y8PzZMRUKSd5CkURPg0PBLGjz/KR/DofHx+G4rPTCOGORYxeYrd01lci5hVxvKccvIk7MD69ZTewfZPSM+0WnsU3f0Zmd7hgbRpUyWceG0eHFpdUKK/ZFWhHjDVC28odCnN885tHncKXviItK0ZUUo/AIthFKlhEXsnq9VL9fFbgvO83ZvpUQo5y8mY3cuGnEVGXdhjNb53CfC1u4dbpYmWaN99subUzEsUaUb3loLPfVfzDOpg2y9v37kBdy/wuXr20teY7U62xj/fAgs1QSnhUtlMTfCqbefyEycKVmKIrJkJLsvgTSYKVvH4FFIwfd5WjqOC97jX98rcVAzhAI0iSkazsWOMvL6m0L4nLJapx+85GsVX8Y6AHmEP4bmCElwil6KAP+UewJFiw5rmwV2pESHAhYuZJa03B8tl0nd2QJzvJGmbeBqXqpF9ORinFM3HErK8puRokOjFH2+1asLeI2tB31W/ELdNe27Ogduq6Z6qBwCp59YX27qydDhD0WRfN64kCs25K88iGAGNW2CAfTDS+b+WYJBiIL9jXYZ4LF+BiUvfdu6Jmc2lnVHN0oWl0c3RUb2tlbnOBoWN2YWxZDjowgg42MAMCAQAwgg4tBgkqhkiG9w0BBwKggg4eMIIOGgIBAzEPMA0GCWCGSAFlAwQCAQUAMIGDBgsqhkiG9w0BCRABBKB0BHIwcAIBAQYJYIZIAYb9bAcBMDEwDQYJYIZIAWUDBAIBBQAEIDk8CKbdbCaC6RznG3yl9LzjGb90KuhKFyeemI3vn6q2AhEAqP3SNGndCd5pVta/xGtS3hgPMjAyNDEyMjYxNDEwNTNaAgkAphtMfoSBfAqgggvAMIIFCjCCAvKgAwIBAgIQDAsvx3p4z7rtZVZUwZokAzANBgkqhkiG9w0BAQsFADBjMQswCQYDVQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4xOzA5BgNVBAMTMkRpZ2lDZXJ0IFRydXN0ZWQgRzQgUlNBNDA5NiBTSEEyNTYgVGltZVN0YW1waW5nIENBMB4XDTI0MTEyMDAwMDAwMFoXDTM2MDIxOTIzNTk1OVowWzELMAkGA1UEBhMCVVMxETAPBgNVBAoTCERpZ2lDZXJ0MTkwNwYDVQQDEzBFQ0MyNTZfU0hBMjU2X1RpbWVzdGFtcF9SZXNwb25kZXJfQWRvYmVfTk9WXzIwMjQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATQ/B6F+IGYpiqQQLxOfqkUmeTmSRWZzxSCtwM82siW/SbXazktRyEWmwIVs+8PJjhV9C4fUJ23IGRxsfzJM8leo4IBizCCAYcwDgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwIAYDVR0gBBkwFzAIBgZngQwBBAIwCwYJYIZIAYb9bAcBMB8GA1UdIwQYMBaAFLoW2W1NhS9zKXaaL3WMaiCPnshvMB0GA1UdDgQWBBTs0RxvfOegTeQxP4cACNSt1H02uzBaBgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3JsMy5kaWdpY2VydC5jb20vRGlnaUNlcnRUcnVzdGVkRzRSU0E0MDk2U0hBMjU2VGltZVN0YW1waW5nQ0EuY3JsMIGQBggrBgEFBQcBAQSBgzCBgDAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQuY29tMFgGCCsGAQUFBzAChkxodHRwOi8vY2FjZXJ0cy5kaWdpY2VydC5jb20vRGlnaUNlcnRUcnVzdGVkRzRSU0E0MDk2U0hBMjU2VGltZVN0YW1waW5nQ0EuY3J0MA0GCSqGSIb3DQEBCwUAA4ICAQCi7MEg8nkvLauLI7cAj21DgnMErh0mntCt4c4tsW9yJQZdZv1n8E1dueayb6IiZ8mYambImrTeuVKwGqUSITZTiVhtFRP3zRD9DpFk+Ex4P010IStH/eD1lgK6bVfaY0gvzcIRQP3CwIzqBZAE81c5QINjPs81cvJLOFKd/cX7zOhoQvrziNDy15UNT5fuURe2fioANQsRNYOmVXAdg2TK7OktYD+EH/D8gWr7nHQhRJMuD54GNjiZnNPnYXz6F3j7Bu2aVlirvQGAAsrW27Lqhg9ksW5+aL+g9/lyqRoMrWLSy4KDQaztPB+PKskecO1R7dbJbw7UBFVl+GbGaUc4x6HvVLNNL5hHjiLrf9A4zxe52e9ZqpSU7kDu7dsRXvm+uLLMXjHFSx/j0stIcxnQHwOL4A5RRuUH1Xw1wz2CiGvIHNcoYrkqfkb6TsKJU7ntDqNKFKZ349sBErTdXwVoId4zS/cV/A5rO1Kw5aNO/zUTCtQkbcMg88XGWqImaYmIHhIvHaE1nRdPWCa0QhrxvioeP45p4/zqd/JrVbNsoEuEBSRIPB3+ViLaoFlimZRUePzwKYvyTrd6g72mVtF4Prbbvy1kqCUmsZDMFqn33DR0N8Qzqkzir3bufNyI5k95Rq3NXcbfNYDx9qZ8gjCu4NHtSxAdJKswzb9gi6jyFTCCBq4wggSWoAMCAQICEAc2N7ckVHzYR6z9KGYqXlswDQYJKoZIhvcNAQELBQAwYjELMAkGA1UEBhMCVVMxFTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UECxMQd3d3LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGlnaUNlcnQgVHJ1c3RlZCBSb290IEc0MB4XDTIyMDMyMzAwMDAwMFoXDTM3MDMyMjIzNTk1OVowYzELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMuMTswOQYDVQQDEzJEaWdpQ2VydCBUcnVzdGVkIEc0IFJTQTQwOTYgU0hBMjU2IFRpbWVTdGFtcGluZyBDQTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAMaGNQZJs8E9cklRVcclA8TykTepl1Gh1tKD0Z5Mom2gsMyD+Vr2EaFEFUJfpIjzaPp985yJC3+dH54PMx9QEwsmc5Zt+FeoAn39Q7SE2hHxc7Gz7iuAhIoiGN/r2j3EF3+rGSs+QtxnjupRPfDWVtTnKC3r07G1decfBmWNlCnT2exp39mQh0YAe9tEQYncfGpXevA3eZ9drMvohGS0UvJ2R/dhgxndX7RUCyFobjchu0CsX7LeSn3O9TkSZ+8OpWNs5KbFHc02DVzV5huowWR0QKfAcsW6Th+xtVhNef7Xj3OTrCw54qVI1vCwMROpVymWJy71h6aPTnYVVSZwmCZ/oBpHIEPjQ2OAe3VuJyWQmDo4EbP29p7mO1vsgd4iFNmCKseSv6De4z6ic/rnH1pslPJSlRErWHRAKKtzQ87fSqEcazjFKfPKqpZzQmiftkaznTqj1QPgv/CiPMpC3BhIfxQ0z9JMq++bPf4OuGQq+nUoJEHtQr8FnGZJUlD0UfM2SU2LINIsVzV5K6jzRWC8I41Y99xh3pP+OcD5sjClTNfpmEpYPtMDiP6zj9NeS3YSUZPJjAw7W4oiqMEmCPkUEBIDfV8ju2TjY+Cm4T72wnSyPx4JduyrXUZ14mCjWAkBKAAOhFTuzuldyF4wEr1GnrXTdrnSDmuZDNIztM2xAgMBAAGjggFdMIIBWTASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBS6FtltTYUvcyl2mi91jGogj57IbzAfBgNVHSMEGDAWgBTs1+OC0nFdZEzfLmc/57qYrhwPTzAOBgNVHQ8BAf8EBAMCAYYwEwYDVR0lBAwwCgYIKwYBBQUHAwgwdwYIKwYBBQUHAQEEazBpMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdpY2VydC5jb20wQQYIKwYBBQUHMAKGNWh0dHA6Ly9jYWNlcnRzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRSb290RzQuY3J0MEMGA1UdHwQ8MDowOKA2oDSGMmh0dHA6Ly9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRSb290RzQuY3JsMCAGA1UdIAQZMBcwCAYGZ4EMAQQCMAsGCWCGSAGG/WwHATANBgkqhkiG9w0BAQsFAAOCAgEAfVmOwJO2b5ipRCIBfmbW2CFC4bAYLhBNE88wU86/GPvHUF3iSyn7cIoNqilp/GnBzx0H6T5gyNgL5Vxb122H+oQgJTQxZ822EpZvxFBMYh0MCIKoFr2pVs8Vc40BIiXOlWk/R3f7cnQU1/+rT4osequFzUNf7WC2qk+RZp4snuCKrOX9jLxkJodskr2dfNBwCnzvqLx1T7pa96kQsl3p/yhUifDVinF2ZdrM8HKjI/rAJ4JErpknG6skHibBt94q6/aesXmZgaNWhqsKRcnfxI2g55j7+6adcq/Ex8HBanHZxhOACcS2n82HhyS7T6NJuXdmkfFynOlLAlKnN36TU6w7HQhJD5TNOXrd/yVjmScsPT9rp/Fmw0HNT7ZAmyEhQNC3EyTN3B14OuSereU0cZLXJmvkOHOrpgFPvT87eK1MrfvElXvtCl8zOYdBeHo46Zzh3SP9HSjTx/no8Zhf+yvYfvJGnXUsHicsJttvFXseGYs2uJPU5vIXmVnKcPA3v5gA3yAWTyf7YGcWoWa63VXAOimGsJigK+2VQbc61RWYMbRiCQ8KvYHZE/6/pNHzV9m8BPqC3jLfBInwAM1dwvnQI38AC+R2AibZ8GV2QqYphwlHK+Z/GqSFD/yYlvZVVCsfgPrA8g4r5db7qS9EFUrnEw4d2zc4GqEr9u3WfPwxggG4MIIBtAIBATB3MGMxCzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjE7MDkGA1UEAxMyRGlnaUNlcnQgVHJ1c3RlZCBHNCBSU0E0MDk2IFNIQTI1NiBUaW1lU3RhbXBpbmcgQ0ECEAwLL8d6eM+67WVWVMGaJAMwDQYJYIZIAWUDBAIBBQCggdEwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0yNDEyMjYxNDEwNTNaMCsGCyqGSIb3DQEJEAIMMRwwGjAYMBYEFPcTAlRkG5zO0lEtYsW/nymEjPz4MC8GCSqGSIb3DQEJBDEiBCAdWRGyRWy5U5okzvMABigZQswOphlan2f5waczPIo88zA3BgsqhkiG9w0BCRACLzEoMCYwJDAiBCC5eiZoHRjpuXxjPvhIOWRVdZeW2lBDRCyPjM3lJ+AAqTAKBggqhkjOPQQDAgRHMEUCIQDz2yuxm+r1xBgpDvEspK6BNIh0FDGZrYRU5rZTBBerbwIgG9jCg8jZzklCy3bKTsN+5a5tLqI3Ar0lF+ouuwFfaohjcGFkWRODAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
const require$1 = createRequire(import.meta.url);
const ffmpegPath = require$1("ffmpeg-static");
function getFfmpegPath() {
  if (!ffmpegPath) return "";
  if (app.isPackaged) {
    return ffmpegPath.replace("app.asar", "app.asar.unpacked");
  }
  return ffmpegPath;
}
Object.assign(console, log.functions);
const store = new Store();
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const isAlwaysOnTop = store.get("alwaysOnTop", true);
  win = new BrowserWindow({
    width: 320,
    height: 200,
    alwaysOnTop: isAlwaysOnTop,
    fullscreenable: false,
    resizable: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      webSecurity: true,
      sandbox: false,
      devTools: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  setupAudioHandlers();
  setupDesktopSourceHandlers();
  ipcMain.on("close-app", () => {
    app.quit();
  });
  ipcMain.on("toggle-always-on-top", () => {
    const window2 = BrowserWindow.getFocusedWindow();
    const newIsAlwaysOnTop = !(window2 == null ? void 0 : window2.isAlwaysOnTop());
    if (!window2) return;
    window2.setAlwaysOnTop(newIsAlwaysOnTop);
    store.set("alwaysOnTop", newIsAlwaysOnTop);
  });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
function setupAudioHandlers() {
  ipcMain.handle("save-audio", async (_, base64Data) => {
    try {
      const tempDir = path.join(require$$1.tmpdir(), "audio-recorder");
      if (!require$$0.existsSync(tempDir)) {
        require$$0.mkdirSync(tempDir, { recursive: true });
      }
      const lastSavedPath = store.get("lastSavedPath", app.getPath("desktop"));
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Save Audio Recording",
        defaultPath: path.join(lastSavedPath, `recording-${Date.now()}.wav`),
        filters: [{ name: "WAV Audio", extensions: ["wav"] }]
      });
      if (canceled || !filePath) return null;
      const tempWebmPath = path.join(tempDir, `temp-${Date.now()}.webm`);
      const buffer = Buffer.from(base64Data, "base64");
      require$$0.writeFileSync(tempWebmPath, buffer);
      await new Promise((resolve2, reject) => {
        const ffmpegProcess = spawn(getFfmpegPath(), [
          "-y",
          "-i",
          tempWebmPath,
          "-acodec",
          "pcm_s16le",
          "-ar",
          "44100",
          filePath
        ]);
        ffmpegProcess.on("close", (code2) => {
          if (code2 === 0) {
            resolve2();
          } else {
            reject(new Error(`FFmpeg process exited with code ${code2}`));
          }
        });
        ffmpegProcess.on("error", (err) => {
          reject(new Error(`FFmpeg process error: ${err.message}`));
        });
      });
      try {
        require$$0.unlinkSync(tempWebmPath);
      } catch (cleanupError) {
        console.error("Error cleaning up temp file:", cleanupError);
      }
      store.set("lastSavedPath", path.dirname(filePath));
      return filePath;
    } catch (error) {
      console.error("Error saving audio:", error);
      return null;
    }
  });
}
function setupDesktopSourceHandlers() {
  ipcMain.handle("get-desktop-sources", async () => {
    try {
      const sources = await desktopCapturer.getSources({
        types: ["screen"],
        thumbnailSize: { width: 200, height: 200 }
      });
      return sources;
    } catch (error) {
      console.error("Error getting desktop sources:", error);
      return [];
    }
  });
  ipcMain.handle("get-desktop-stream", async (event, source2) => {
    try {
      const mainWindow = BrowserWindow.fromWebContents(event.sender);
      if (!mainWindow) {
        throw new Error("Main window not found");
      }
      const stream = await mainWindow.webContents.executeJavaScript(`
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: '${source2.id}'
          }
        })
      `);
      return stream;
    } catch (error) {
      console.error("Error getting desktop stream:", error);
      throw error;
    }
  });
}
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  setupAudioHandlers,
  setupDesktopSourceHandlers
};
