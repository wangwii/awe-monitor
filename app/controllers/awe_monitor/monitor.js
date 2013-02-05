Ext.define('IFramePanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.iframepanel',
  layout: 'fit',
  html: '<iframe scrolling="no" frameborder="0" src="http://localhost:3000"></iframe>',
  listeners: {
    afterrender: function(panel){
      var iframeEle = panel.getIFrameElement();
      iframeEle.applyStyles({width: '100%', height: '100%'});
      iframeEle.on('load', Ext.Function.bind(panel.onContentLoaded, panel));
    },
    resize: function(panel, width, height){
      //console.log(Ext.getClassName(this) + ':.....' + width + "," + height);
    }
  },
  getIFrameElement: function(){
    return this.body.down('iframe');
  },
  onContentLoaded: function(ev){
    if (this.onloaded && Ext.isFunction(this.onloaded)) {
      this.onloaded(ev);
    }
  },
  open: function(url, callback){
    var iframeEle = this.getIFrameElement();
    this.onloaded = callback;
    iframeEle.dom.src = url;
  }
});

Ext.define('MonitorForm', {
  extend: 'Ext.form.Panel',
  alias: 'widget.myform',
  frame: true,
  bodyPadding: '5 5 0',
  layout: 'anchor',
  fieldDefaults: {
    labelAlign: 'top',
    msgTarget: 'bottom'
  },
  defaults: {
    anchor: '100%',
    xtype: 'textfield',
    allowBlank: false
  },
  items: [
    {
      fieldLabel: 'URL',
      name: 'url',
      value: 'http://localhost:3000'
    },
    {
      xtype: 'numberfield',
      minValue: 1,
      maxValue: 60,
      fieldLabel: 'Interval(seconds)',
      name: 'interval',
      value: 5,
      allowBlank: true
    },
    {
      name: 'next',
      fieldLabel: 'Next test on',
      style: {marginTop: '20px'},
      readOnly: true,
      allowBlank: true,
      value: ''
    },
    {
      xtype: 'htmleditor',
      fieldLabel: 'Logs',
      name: 'logs',
      enableAlignments: false,
      enableColors: false,
      enableFont: false,
      enableFontSize: false,
      enableFormat: false,
      enableLinks: false,
      enableLists: false,
      enableSourceEdit: false,
      readOnly: true
    }
  ],
  getUrlField: function(){
    return this.getForm().findField('url');
  }
});

Ext.onReady(function(){
  Ext.create('Ext.Viewport', {
    layout: 'border',
    hideBorders: true,
    items: [
      {
        region: 'west',
        split: true,
        minWidth: 160,
        width: '20%',
        title: 'Settings',
        xtype: 'myform'
      },
      {
        region: 'center',
        title: 'View',
        xtype: 'iframepanel'
      }
    ],
    listeners: {
      afterrender: function(panel){
        var form = this.down('myform');
        var urlField = form.getUrlField();
        if (!urlField) {
          return;
        }
        urlField.on('change', this.onUrlChanged, this, {buffer: 1000});
        //urlField.fireEvent('change');
      }
    },
    onUrlChanged: function(){
      var form = this.down('myform');
      var urlField = form.getUrlField();
      if (!urlField.isValid()) {
        return;
      }
      var iframe = this.down('iframepanel');
      iframe.open(urlField.getValue(), Ext.Function.bind(this.onIFrameLoadded, this));
    },
    onIFrameLoadded: function(){
      var iframeEle = this.down('iframepanel').getIFrameElement();
      var ifWindow = iframeEle.dom.contentWindow;
      if (/login/.test(ifWindow.location.href)) {
        alert('Please login to ....');
      }else{
        alert('Startup auto task to Monitor..');
      }
    }
  });
});