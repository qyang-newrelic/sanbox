
const assert= require ('assert')
const log = console.log

// load remote script
const custReq = require ('urllib-sync').request;
const custJSURL='https://s3-us-west-2.amazonaws.com/btan-custom-js-export/speakeasyBundleVer2.js'
const custResp = custReq(custJSURL, {followRedirect:true,gzip:true});
const speakeasyData = custResp.data.toString('utf8');
const speakeasy=  Function( `return ${speakeasyData};`)()

assert(typeof (speakeasy) == 'object')

// https://www.npmjs.com/package/speakeasy
// https://github.com/speakeasyjs/speakeasy/blob/master/test/totp_test.js
//
// speakesy unit test
// describe('TOTP Time-Based Algorithm Test', function () {
// describe("normal operation with secret = '12345678901234567890' at time = 59", function () {
// it('should return correct one-time password', function () {
var topic = speakeasy.totp({secret: '12345678901234567890', time: 59});
assert.equal(topic, '287082');


// 
// IMPORANT!!: 
// base32 is not supported in the bundled version
// Convert your secret to HEX offline with this code before using :
// Node.js
// let secretHex= require('base32.js').decode(<base32 secret>).toString('hex')
//
const MFAOptions = {
    secret: $secure.DEMO_SECRET_HEX  ,
    encoding: 'hex',
    algorithm: 'sha1'
}

log(`MFAOptions=${JSON.stringify(MFAOptions)}`)

var token = speakeasy.totp(MFAOptions)
log('totp => '+ token)

// Verify a given token
var tokenIsValid=  speakeasy.totp.verify( Object.assign(MFAOptions, {token}))
log('totp.verify=' + tokenIsValid )
assert(tokenIsValid)

//
// Nothing to do with speakeasy test
// Synthetics Sample script
//
$browser.get('http://example.com').then(function(){
  // Check the H1 title matches "Example Domain"
  return $browser.findElement($driver.By.css('h1')).then(function(element){
    return element.getText().then(function(text){
      assert.equal('Example Domain', text, 'Page H1 title did not match');
    });
  });
})
