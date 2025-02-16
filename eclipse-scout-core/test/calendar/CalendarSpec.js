/*
 * Copyright (c) 2010-2023 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */
import {Calendar, DateRange, dates} from '../../src/index';
import {CalendarSpecHelper} from '../../src/testing/index';

describe('Calendar', () => {
  let session, helper;

  beforeEach(() => {
    setFixtures(sandbox());
    jasmine.Ajax.install();
    jasmine.clock().install();
    session = sandboxSession();
    helper = new CalendarSpecHelper(session);
    uninstallUnloadHandlers(session);
  });

  afterEach(() => {
    session = null;
    jasmine.Ajax.uninstall();
    jasmine.clock().uninstall();
  });

  describe('init', () => {

    it('creates an empty calendar', () => {
      let cal = helper.createCalendar(helper.createSimpleModel());
      expect(cal.viewRange).toBeDefined();
    });

  });

  describe('dayPosition', () => {

    it('calculates the day position', () => {
      let cal = helper.createCalendar(helper.createSimpleModel());
      // fix total size: 80
      // All day event. Not relevant since in top grid
      expect(cal._dayPosition(-1, 0)).toBe(0);
      expect(cal._dayPosition(0, 0)).toBe(0);
      expect(cal._dayPosition(4, 0)).toBe(16.67); // one sixth
      expect(cal._dayPosition(8, 0)).toBe(33.33); // one third
      expect(cal._dayPosition(10, 0)).toBe(41.67);
      expect(cal._dayPosition(12, 0)).toBe(50);
      expect(cal._dayPosition(12.5, 0)).toBe(52.08);
      expect(cal._dayPosition(13, 0)).toBe(54.17);
      expect(cal._dayPosition(17, 0)).toBe(70.83);
      expect(cal._dayPosition(24, 0)).toBe(100);
    });

  });

  describe('component', () => {
    let cal, c1, c2, c3, c4, c5, c6, c7, c8;
    let day = dates.parseJsonDate('2016-07-20 00:00:00.000');
    let option1 = {
      fromDate: '2016-07-20 12:00:00.000',
      toDate: '2016-07-20 12:30:00.000'
    };
    let option2 = {
      fromDate: '2016-07-20 12:30:00.000',
      toDate: '2016-07-20 13:00:00.000'
    };
    let option3 = {
      fromDate: '2016-07-20 13:00:00.000',
      toDate: '2016-07-20 20:00:00.000'
    };
    let option4 = {
      fromDate: '2016-07-20 13:30:00.000',
      toDate: '2016-07-20 15:00:00.000'
    };
    let option5 = {
      fromDate: '2016-07-20 12:15:00.000',
      toDate: '2016-07-20 16:00:00.000'
    };

    let optionSmall1 = {
      fromDate: '2016-07-20 11:59:00.000',
      toDate: '2016-07-20 12:00:00.000'
    };

    let option8 = {
      fromDate: '2016-07-20 12:00:00.000',
      toDate: '2016-07-21 08:00:00.000'
    };

    beforeEach(() => {
      cal = helper.createCalendar(helper.createSimpleModel());
      c1 = helper.createComponent(option1, cal);
      c2 = helper.createComponent(option2, cal);
      c3 = helper.createComponent(option3, cal);
      c4 = helper.createComponent(option4, cal);
      c5 = helper.createComponent(option5, cal);
      c6 = helper.createComponent(optionSmall1, cal);
      c7 = helper.createComponent(optionSmall1, cal);
      c8 = helper.createComponent(option8, cal);
    });

    describe('part day position', () => {

      it('calculates the part day position', () => {
        let posRange = c4.getPartDayPosition(day);
        expect(posRange.from).toBe(56.25);
        expect(posRange.to).toBe(62.5);
      });

      it('calculates the part day position for a range smaller than the minimum', () => {
        let posRange = c7.getPartDayPosition(day);
        let minRange = 2.08; // Rounded to two digits: 30min (default division in calendar)
        expect(posRange.from).toBe(49.93);
        expect(posRange.to).toBe(49.93 + minRange);
      });

    });

    describe('sort', () => {
      it('sorts first from then to', () => {
        let components = [c4, c2, c1];
        cal._sort(components, day);
        expect(components[0] === c1).toBe(true);
        expect(components[1] === c2).toBe(true);
        expect(components[2] === c4).toBe(true);
      });
    });

    describe('arrangeComponents', () => {

      it('does nothing for no components', () => {
        let components = [];
        cal._arrange(components, day);
        expect(components).toEqual([]);
      });

      it('arranges a single component', () => {
        let components = [c1];
        cal._arrange(components, day);
        expect(components[0]).toEqual(c1);
        expect(c1.stack[day].x).toEqual(0);
        expect(c1.stack[day].w).toEqual(1);
      });

      it('arranges intersecting components', () => {
        let components = [c5, c1];
        cal._arrange(components, day);
        expect(components[0]).toEqual(c1);
        expect(components[1]).toEqual(c5);
        expect(c1.stack[day].x).toEqual(0);
        expect(c1.stack[day].w).toEqual(2);
        expect(c5.stack[day].x).toEqual(1);
        expect(c5.stack[day].w).toEqual(2);
      });

      it('arranges equal components', () => {
        let components = [c6, c7];
        cal._arrange(components, day);
        expect(components[0]).toEqual(c6);
        expect(components[1]).toEqual(c7);
        expect(c6.stack[day].x).toEqual(0);
        expect(c6.stack[day].w).toEqual(2);
        expect(c7.stack[day].x).toEqual(1);
        expect(c7.stack[day].w).toEqual(2);
      });

      it('arranges intersecting and non-intersecting components', () => {
        let components = [c1, c2, c3, c4, c5, c6];
        cal._arrange(components, day);
        expect(components[0]).toEqual(c6);
        expect(components[1]).toEqual(c1);
        expect(components[2]).toEqual(c5);
        expect(components[3]).toEqual(c2);
        expect(components[4]).toEqual(c3);
        expect(components[5]).toEqual(c4);
        expect(c1.stack[day].w).toEqual(3);
        expect(c2.stack[day].w).toEqual(3);
        expect(c3.stack[day].w).toEqual(3);
        expect(c4.stack[day].w).toEqual(3);
        expect(c5.stack[day].w).toEqual(3);
        expect(c6.stack[day].w).toEqual(3);

        expect(c6.stack[day].x).toEqual(0);
        expect(c1.stack[day].x).toEqual(1);
        expect(c5.stack[day].x).toEqual(2);
        expect(c2.stack[day].x).toEqual(0);
        expect(c3.stack[day].x).toEqual(0);
        expect(c4.stack[day].x).toEqual(1);
      });

      it('reduces rows when arranging components', () => {
        let components = [c1, c3, c6];
        cal._arrange(components, day);
        expect(components[0]).toEqual(c6);
        expect(components[1]).toEqual(c1);
        expect(components[2]).toEqual(c3);
        expect(c6.stack[day].w).toEqual(2);
        expect(c1.stack[day].w).toEqual(2);
        expect(c3.stack[day].w).toEqual(1);

        expect(c6.stack[day].x).toEqual(0);
        expect(c1.stack[day].x).toEqual(1);
        expect(c3.stack[day].x).toEqual(0);
      });

      it('arranges intersecting components spanning more than one day', () => {
        let day1 = day;
        let components = [c8, c3];

        cal._arrange(components, day1);
        expect(components[0]).toEqual(c8);
        expect(components[1]).toEqual(c3);
        expect(c8.stack[day1].w).toEqual(2);
        expect(c3.stack[day1].w).toEqual(2);

        expect(c8.stack[day1].x).toEqual(0);
        expect(c3.stack[day1].x).toEqual(1);
      });

    });

    describe('_updateFullDayIndices', () => {
      const mondayStr = '2023-05-22 00:00:00.000';
      const tuesdayStr = '2023-05-23 00:00:00.000';
      const wednesdayStr = '2023-05-24 00:00:00.000';
      const thursdayStr = '2023-05-25 00:00:00.000';
      const fridayStr = '2023-05-26 00:00:00.000';
      const mondayDate = dates.parseJsonDate(mondayStr);
      const wednesdayDate = dates.parseJsonDate(wednesdayStr);
      const thursdayDate = dates.parseJsonDate(thursdayStr);
      const fridayDate = dates.parseJsonDate(fridayStr);

      let mondayWednesday, tuesdayThursday, wednesdayFriday,
        monday, tuesday1, tuesday2, wednesday, thursday1, thursday2, friday,
        fullDayComponents;

      beforeEach(() => {
        mondayWednesday = createFullDay(mondayStr, wednesdayStr);
        tuesdayThursday = createFullDay(tuesdayStr, thursdayStr);
        wednesdayFriday = createFullDay(wednesdayStr, fridayStr);
        monday = createFullDay(mondayStr, mondayStr);
        tuesday1 = createFullDay(tuesdayStr, tuesdayStr);
        tuesday2 = createFullDay(tuesdayStr, tuesdayStr);
        wednesday = createFullDay(wednesdayStr, wednesdayStr);
        thursday1 = createFullDay(thursdayStr, thursdayStr);
        thursday2 = createFullDay(thursdayStr, thursdayStr);
        friday = createFullDay(fridayStr, fridayStr);

        fullDayComponents = [mondayWednesday, tuesdayThursday, wednesdayFriday,
          monday, tuesday1, tuesday2, wednesday, thursday1, thursday2, friday];

        cal.render();
      });

      function createFullDay(fromDate, toDate) {
        return helper.createComponent({
          fromDate, toDate,
          coveredDaysRange: {
            from: fromDate,
            to: toDate
          },
          fullDay: true
        }, cal);
      }

      it('is not updated if component is out of range', () => {
        expect(mondayWednesday.fullDayIndex).toBe(-1);
        expect(tuesdayThursday.fullDayIndex).toBe(-1);
        expect(wednesdayFriday.fullDayIndex).toBe(-1);
        expect(monday.fullDayIndex).toBe(-1);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).toBe(-1);
        expect(thursday1.fullDayIndex).toBe(-1);
        expect(thursday2.fullDayIndex).toBe(-1);
        expect(friday.fullDayIndex).toBe(-1);

        cal._exactRange = new DateRange(mondayDate, mondayDate);
        cal._updateFullDayIndices(fullDayComponents);

        expect(mondayWednesday.fullDayIndex).not.toBe(-1);
        expect(tuesdayThursday.fullDayIndex).toBe(-1);
        expect(wednesdayFriday.fullDayIndex).toBe(-1);
        expect(monday.fullDayIndex).not.toBe(-1);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).toBe(-1);
        expect(thursday1.fullDayIndex).toBe(-1);
        expect(thursday2.fullDayIndex).toBe(-1);
        expect(friday.fullDayIndex).toBe(-1);

        cal._exactRange = new DateRange(wednesdayDate, thursdayDate);
        cal._updateFullDayIndices(fullDayComponents);

        expect(mondayWednesday.fullDayIndex).not.toBe(-1);
        expect(tuesdayThursday.fullDayIndex).not.toBe(-1);
        expect(wednesdayFriday.fullDayIndex).not.toBe(-1);
        expect(monday.fullDayIndex).toBe(-1);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).not.toBe(-1);
        expect(thursday1.fullDayIndex).not.toBe(-1);
        expect(thursday2.fullDayIndex).not.toBe(-1);
        expect(friday.fullDayIndex).toBe(-1);

        cal._exactRange = new DateRange(thursdayDate, thursdayDate);
        cal._updateFullDayIndices(fullDayComponents);

        expect(mondayWednesday.fullDayIndex).toBe(-1);
        expect(tuesdayThursday.fullDayIndex).not.toBe(-1);
        expect(wednesdayFriday.fullDayIndex).not.toBe(-1);
        expect(monday.fullDayIndex).toBe(-1);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).toBe(-1);
        expect(thursday1.fullDayIndex).not.toBe(-1);
        expect(thursday2.fullDayIndex).not.toBe(-1);
        expect(friday.fullDayIndex).toBe(-1);
      });

      it('is correctly updated', () => {
        expect(mondayWednesday.fullDayIndex).toBe(-1);
        expect(tuesdayThursday.fullDayIndex).toBe(-1);
        expect(wednesdayFriday.fullDayIndex).toBe(-1);
        expect(monday.fullDayIndex).toBe(-1);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).toBe(-1);
        expect(thursday1.fullDayIndex).toBe(-1);
        expect(thursday2.fullDayIndex).toBe(-1);
        expect(friday.fullDayIndex).toBe(-1);

        cal._exactRange = new DateRange(mondayDate, mondayDate);
        cal._updateFullDayIndices(fullDayComponents);

        // monday
        // mondayWednesday

        expect(mondayWednesday.fullDayIndex).toBe(1);
        expect(tuesdayThursday.fullDayIndex).toBe(-1);
        expect(wednesdayFriday.fullDayIndex).toBe(-1);
        expect(monday.fullDayIndex).toBe(0);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).toBe(-1);
        expect(thursday1.fullDayIndex).toBe(-1);
        expect(thursday2.fullDayIndex).toBe(-1);
        expect(friday.fullDayIndex).toBe(-1);

        cal._exactRange = new DateRange(mondayDate, fridayDate);
        cal._updateFullDayIndices(fullDayComponents);

        // monday
        // mondayWednesday

        // tuesday1
        // mondayWednesday
        // tuesday2
        // tuesdayThursday

        // wednesday
        // mondayWednesday
        // wednesdayFriday
        // tuesdayThursday

        // thursday1
        // thursday2
        // wednesdayFriday
        // tuesdayThursday

        // friday
        //
        // wednesdayFriday

        expect(mondayWednesday.fullDayIndex).toBe(1);
        expect(tuesdayThursday.fullDayIndex).toBe(3);
        expect(wednesdayFriday.fullDayIndex).toBe(2);
        expect(monday.fullDayIndex).toBe(0);
        expect(tuesday1.fullDayIndex).toBe(0);
        expect(tuesday2.fullDayIndex).toBe(2);
        expect(wednesday.fullDayIndex).toBe(0);
        expect(thursday1.fullDayIndex).toBe(0);
        expect(thursday2.fullDayIndex).toBe(1);
        expect(friday.fullDayIndex).toBe(0);

        cal._exactRange = new DateRange(fridayDate, fridayDate);
        cal._updateFullDayIndices(fullDayComponents);

        // wednesdayFriday
        // friday

        expect(mondayWednesday.fullDayIndex).toBe(-1);
        expect(tuesdayThursday.fullDayIndex).toBe(-1);
        expect(wednesdayFriday.fullDayIndex).toBe(0);
        expect(monday.fullDayIndex).toBe(-1);
        expect(tuesday1.fullDayIndex).toBe(-1);
        expect(tuesday2.fullDayIndex).toBe(-1);
        expect(wednesday.fullDayIndex).toBe(-1);
        expect(thursday1.fullDayIndex).toBe(-1);
        expect(thursday2.fullDayIndex).toBe(-1);
        expect(friday.fullDayIndex).toBe(1);
      });
    });
  });

  describe('navigation', () => {

    it('navigate forward and back (with first day of month selected)', () => {
      // empty parent div
      let $div = $('<div></div>');

      // init model
      let model = helper.createSimpleModel();
      model.selectedDate = '2016-01-01 12:00:00.000';
      model.displayMode = Calendar.DisplayMode.MONTH;

      // init and render calendar
      let cal = helper.createCalendar(model);
      cal.render($div);

      let viewRange = cal.viewRange;
      let selectedDate = cal.selectedDate;

      // go two months forward, four month back and two  month forward
      // (navigate over JAN/FEB (31. vs. 27. days) month-boundary and 2015/2016 year-boundary)
      for (let f1 = 0; f1 < 2; f1++) {
        cal._onNextClick();
      }
      for (let b1 = 0; b1 < 4; b1++) {
        cal._onPreviousClick();
      }
      for (let f2 = 0; f2 < 2; f2++) {
        cal._onNextClick();
      }

      // expect viewRange is the same as before navigation
      expect(cal.viewRange).toEqual(viewRange);
      // expect selectedDate is the same as before navigation
      expect(cal.selectedDate).toEqual(selectedDate);
    });

    it('navigate forward and back (with last day of month selected)', () => {
      // empty parent div
      let $div = $('<div></div>');

      // init model
      let model = helper.createSimpleModel();
      model.selectedDate = '2016-01-31 12:00:00.000';
      model.displayMode = Calendar.DisplayMode.MONTH;

      // init and render calendar
      let cal = helper.createCalendar(model);
      cal.render($div);

      let viewRange = cal.viewRange;

      // go two months forward, four month back and two  month forward
      // (navigate over JAN/FEB (31. vs. 27. days) month-boundary and 2015/2016 year-boundary)
      for (let f1 = 0; f1 < 2; f1++) {
        cal._onNextClick();
      }
      for (let b1 = 0; b1 < 4; b1++) {
        cal._onPreviousClick();
      }
      for (let f2 = 0; f2 < 2; f2++) {
        cal._onNextClick();
      }

      // expect viewRange is the same as before navigation
      expect(cal.viewRange).toEqual(viewRange);

      // expect selectedDate is the same as 2016-01-29,
      // because the day was shifted to 29 while navigating over Feb. 2016
      expect(cal.selectedDate).toEqual(dates.parseJsonDate('2016-01-29 12:00:00.000'));
    });

  });
});
