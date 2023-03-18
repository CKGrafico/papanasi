import { useMetadata, useStore } from '@builder.io/mitosis';
import './column.css';
import type { ColumnProps, ColumnState } from './column.model';
import { columnService } from './column.service';

useMetadata({ isAttachedToShadowDom: true });

export default function Column(props: ColumnProps) {
  const state = useStore<ColumnState>({
    get classes() {
      return columnService.getClasses(
        props.centered || false,
        props.basic,
        props.xxs,
        props.xs,
        props.s,
        props.m,
        props.l,
        props.xl,
        props.xxl,
        props.className
      );
    }
  });

  return <div className={state.classes.base}>{props.children}</div>;
}
