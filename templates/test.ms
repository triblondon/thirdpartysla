<div class='test row{{#tags}} tag-{{.}}{{/tags}}' data-key='{{key}}'>
    <div class='col-lg-6 col-md-12 question'>{{q}}</div>
    <div class='col-lg-3 col-md-7 col-sm-9 col-xs-7 input'>
        {{#select}}<select class='form-control'><option></option>{{#select.opts}}<option>{{.}}</option>{{/select.opts}}</select>{{/select}}
        {{#multi}}{{#multi.opts}}<div class="checkbox"><label><input type="checkbox" value="{{.}}">{{.}}</label></div>{{/multi.opts}}{{/multi}}
        {{#text}}<input class='form-control' type='text' />{{/text}}
    </div>
    <div class='col-lg-3 col-md-5 col-sm-3 col-xs-5 result'></div>
</div>
