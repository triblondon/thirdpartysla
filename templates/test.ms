<div class='test row{{#tags}} tag-{{.}}{{/tags}}' data-key='{{key}}'>
    <div class='col-lg-7 col-md-12 question'>{{q}}</div>
    <div class='col-lg-2 col-md-4 input'>
        {{#select}}<select class='form-control'><option></option>{{#select.opts}}<option>{{.}}</option>{{/select.opts}}</select>{{/select}}
        {{#text}}<input class='form-control' type='text' />{{/text}}
    </div>
    <div class='col-lg-3 col-md-8 result'></div>
</div>
