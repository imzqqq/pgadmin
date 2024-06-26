import _ from 'lodash';

import {
  EV_BROWSER_FRAME_URLLOADED_,
  EV_BROWSER_FRAME,
  EV_BROWSER_FRAME_,
  EV_BROWSER_FRAME__,
} from 'sources/constants';

define([
  'sources/pgadmin', 'jquery', 'wcdocker',
], function(pgAdmin, $) {
  let pgBrowser = pgAdmin.Browser = pgAdmin.Browser || {},
    wcDocker = window.wcDocker,
    wcIFrame = window.wcIFrame;

  pgAdmin.Browser.Frame = function(options) {
    let defaults = [
      'name', 'title', 'width', 'height', 'showTitle', 'isCloseable',
      'isPrivate', 'url', 'icon', 'onCreate', 'isLayoutMember', 'isRenamable',
    ];
    _.extend(this, _.pick(options, defaults));
  };

  _.extend(pgAdmin.Browser.Frame.prototype, {
    name: '',
    title: '',
    width: 300,
    height: 600,
    showTitle: true,
    isClosable: true,
    isRenamable: false,
    isPrivate: false,
    isLayoutMember: false,
    url: '',
    icon: '',
    panel: null,
    frame: null,
    onCreate: null,
    load: function(docker) {
      let that = this;
      
      if (!that.panel) {
        docker.registerPanelType(this.name, {
          title: that.title,
          isPrivate: that.isPrivate,
          isLayoutMember: that.isLayoutMember,
          onCreate: function(myPanel) {
            myPanel.initSize(that.width, that.height);

            if (!(myPanel.showTitle??true))
              myPanel.title(false);

            myPanel.icon(that.icon);

            myPanel.closeable(!!that.isCloseable);
            myPanel.renamable(that.isRenamable);

            let $frameArea = $('<div style="position:absolute; top:0 !important; width:100%; height:100%; display:table; z-index:0;">');
            myPanel.layout().addItem($frameArea);
            that.panel = myPanel;
            let frame = new wcIFrame($frameArea, myPanel);

            myPanel.frameData = {
              pgAdminName: that.name,
              frameInitialized: false,
              embeddedFrame: frame,
            };

            if (that.url != '' && that.url != 'about:blank') {
              setTimeout(function() {
                frame.openURL(that.url);
                myPanel.frameData.frameInitialized = true;
                pgBrowser.Events.trigger(
                  EV_BROWSER_FRAME_URLLOADED_ + that.name, frame,
                  that.url, self
                );
              }, 50);
            } else {
              frame.openURL('about:blank');
              myPanel.frameData.frameInitialized = true;
              pgBrowser.Events.trigger(
                EV_BROWSER_FRAME_URLLOADED_ + that.name, frame,
                that.url, self
              );
            }

            if (that.events && _.isObject(that.events)) {
              _.each(that.events, function(v, k) {
                if (v && _.isFunction(v)) {
                  myPanel.on(k, v);
                }
              });
            }

            _.each([
              wcDocker.EVENT.UPDATED, wcDocker.EVENT.VISIBILITY_CHANGED,
              wcDocker.EVENT.BEGIN_DOCK, wcDocker.EVENT.END_DOCK,
              wcDocker.EVENT.GAIN_FOCUS, wcDocker.EVENT.LOST_FOCUS,
              wcDocker.EVENT.CLOSED, wcDocker.EVENT.BUTTON,
              wcDocker.EVENT.ATTACHED, wcDocker.EVENT.DETACHED,
              wcDocker.EVENT.MOVE_STARTED, wcDocker.EVENT.MOVE_ENDED,
              wcDocker.EVENT.MOVED, wcDocker.EVENT.RESIZE_STARTED,
              wcDocker.EVENT.RESIZE_ENDED, wcDocker.EVENT.RESIZED,
              wcDocker.EVENT.SCROLLED,
            ], function(_event_name) {
              myPanel.on(
                _event_name,
                that.eventFunc.bind(myPanel, _event_name)
              );
            });

            if (that.onCreate && _.isFunction(that.onCreate)) {
              that.onCreate.apply(that, [myPanel, frame]);
            }
          },
        });
      }
    },
    eventFunc: function(eventName) {
      let name = this.frameData.pgAdminName;

      try {
        pgBrowser.Events.trigger(
          EV_BROWSER_FRAME, eventName, this, arguments
        );
        pgBrowser.Events.trigger(
          EV_BROWSER_FRAME_ + eventName, this, arguments
        );

        if (name) {
          pgBrowser.Events.trigger(
            EV_BROWSER_FRAME__ + name,
            eventName, this, arguments
          );
          pgBrowser.Events.trigger(
            EV_BROWSER_FRAME__ + name + ':' + eventName,
            this, arguments
          );
        }
      } catch (e) {
        console.warn(e.stack || e);
      }
    },
  });

  return pgAdmin.Browser.Frame;
});
