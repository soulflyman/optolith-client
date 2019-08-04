import { isJust, Just, Maybe, Nothing } from "../../../Data/Maybe";
import { fromDefault, PartialMaybeOrNothing, Record, RecordCreator } from "../../../Data/Record";
import { DCIds } from "../../Selectors/derivedCharacteristicsSelectors";

export interface DerivedCharacteristic<I extends DCIds = DCIds> {
  id: I
  short: string
  name: string
  calc: string
  base: Maybe<number>
  value: Maybe<number>
  add: Maybe<number>
  mod: Maybe<number>
  maxAdd: Maybe<number>
  currentAdd: Maybe<number>
  permanentLost: Maybe<number>
  permanentRedeemed: Maybe<number>
}

export interface Energy<I extends DCIds = DCIds> extends DerivedCharacteristic<I> {
  add: Just<number>
  mod: Just<number>
  maxAdd: Just<number>
  currentAdd: Just<number>
  permanentLost: Just<number>
}

export interface EnergyWithLoss<I extends DCIds = DCIds> extends Energy<I> {
  permanentRedeemed: Just<number>
}

interface DerivedCharacteristicCreator extends RecordCreator<DerivedCharacteristic> {
  <I extends DCIds = DCIds>
  (x: EnergyWithLoss<I>): Record<EnergyWithLoss<I>>

  <I extends DCIds = DCIds>
  (x: Energy<I>): Record<Energy<I>>

  <I extends DCIds = DCIds>
  (x: PartialMaybeOrNothing<DerivedCharacteristic<I>>): Record<DerivedCharacteristic<I>>
}

export const DerivedCharacteristic =
  fromDefault ("DerivedCharacteristic")
              <DerivedCharacteristic> ({
                id: "LP",
                short: "",
                name: "",
                calc: "",
                base: Nothing,
                value: Nothing,
                add: Nothing,
                mod: Nothing,
                maxAdd: Nothing,
                currentAdd: Nothing,
                permanentLost: Nothing,
                permanentRedeemed: Nothing,
              }) as DerivedCharacteristicCreator

export const isDerivedCharacteristicEnergy =
  <I extends DCIds = DCIds> (x: Record<DerivedCharacteristic<I>>): x is Record<Energy<I>> =>
    isJust (DerivedCharacteristic.A.add (x))
    && isJust (DerivedCharacteristic.A.mod (x))
    && isJust (DerivedCharacteristic.A.maxAdd (x))
    && isJust (DerivedCharacteristic.A.currentAdd (x))
    && isJust (DerivedCharacteristic.A.permanentLost (x))

export const isDerivedCharacteristicEnergyWithLoss =
  <I extends DCIds = DCIds> (x: Record<DerivedCharacteristic<I>>): x is Record<EnergyWithLoss<I>> =>
    isJust (DerivedCharacteristic.A.add (x))
    && isJust (DerivedCharacteristic.A.mod (x))
    && isJust (DerivedCharacteristic.A.maxAdd (x))
    && isJust (DerivedCharacteristic.A.currentAdd (x))
    && isJust (DerivedCharacteristic.A.permanentLost (x))
    && isJust (DerivedCharacteristic.A.permanentRedeemed (x))
