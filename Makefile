.PHONY: test

test:
	VCR_MODE=playback npm test

html:
	node_modules/.bin/jsdoc lib -r -d html
