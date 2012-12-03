---
layout: default
title: replay-stream tests
---

# TOC
   - [Stream Specification Tests](#stream-specification-tests)
     - [# writable stream-spec](#stream-specification-tests--writable-stream-spec)
     - [# readable stream-spec](#stream-specification-tests--readable-stream-spec)
     - [# through stream-spec](#stream-specification-tests--through-stream-spec)
   - [replay stream Tests](#replay-stream-tests)
     - [# simple stream test](#replay-stream-tests--simple-stream-test)
     - [# simple timestamp tests](#replay-stream-tests--simple-timestamp-tests)
<a name=""></a>
 
<a name="stream-specification-tests"></a>
# Stream Specification Tests
<a name="stream-specification-tests--writable-stream-spec"></a>
## # writable stream-spec
should pass stream-spec validation for writable.

```js
writableStreamSpec(new ReplayStream())
```

<a name="stream-specification-tests--readable-stream-spec"></a>
## # readable stream-spec
should pass stream-spec validation for readable.

```js
readableStreamSpec(new ReplayStream())
```

<a name="stream-specification-tests--through-stream-spec"></a>
## # through stream-spec
should pass stream-spec validation for through.

```js
readableStreamSpec(new ReplayStream())
```

<a name="replay-stream-tests"></a>
# replay stream Tests
<a name="replay-stream-tests--simple-stream-test"></a>
## # simple stream test
should pass pause-unpause stream tests.

```js
pauseUnpauseStream()
```

<a name="replay-stream-tests--simple-timestamp-tests"></a>
## # simple timestamp tests
should pass simple timestamp reading.

```js
simpleReplay(done)
```

should pass simple timestamp reading.

```js
simpleReplayWithConversion(done)
```

should take simple time slice.

```js
simpleTimeSlice(done)
```

