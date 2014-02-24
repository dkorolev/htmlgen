**Usage**: ```npm install htmlgen```

Makes basic HTML generation usecases pain- and error-free.

Write **JavaScript**:


```javascript
var html = new HTML();
html.h1('Header');
html.append('Sample text');
html.br();
html.table(function() {
  html.tr(function() {
    html.td('Test passed', { colspan: 2 }); 
  }); 
  html.tr(function() {
    html.td(function() {
      html.a('Google', { href: 'http://google.com' }); 
    }); 
    html.td(function() {
      html.input({ type: 'text', name: 'test', value: 'OK' }); 
    }); 
  }); 
}, {
  border: 1
});
return html.html;
```

Get **HTML**:

```html
<h1>
  Header
</h1>
Sample text
<br>
<table border="1">
  <tr>
    <td colspan="2">
      Test passed
    </td>
  </tr>
  <tr>
    <td>
      <a href="http://google.com">
        Google
      </a>
    </td>
    <td>
      <input type="text" name="test" value="OK" />
    </td>
  </tr>
</table>
```
