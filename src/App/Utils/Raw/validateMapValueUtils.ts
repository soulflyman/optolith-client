import { pipe } from "ramda";
import { Either, maybeToEither_ } from "../../../Data/Either";
import { equals } from "../../../Data/Eq";
import { fmap } from "../../../Data/Functor";
import { inRange } from "../../../Data/Ix";
import { Cons, flength, List, notNullStr, splitOn } from "../../../Data/List";
import { bindF, ensure, fromJust, fromMaybe, isNothing, Just, liftM2, mapM, Maybe, Nothing } from "../../../Data/Maybe";
import { fromList, OrderedSet } from "../../../Data/OrderedSet";
import { fromBinary, fromBoth, Pair } from "../../../Data/Pair";
import { show } from "../../../Data/Show";
import { toInt, toNatural } from "../NumberUtils";
import { Expect } from "./validateValueUtils";

export const mensureMap =
  (expected: string) =>
  <A> (f: (x: Maybe<string>) => Maybe<A>) =>
  (received: Maybe<string>): Either<string, A> => {
    const res = f (received)

    return maybeToEither_
      (() => `Expected: ${expected}, Received: ${show (received)}`)
      (res)
  }

/**
 * Use if the received value at `mensureMap` can be `Nothing`. The
 * `Maybe` returned from the passed function says if the value is valid
 * (`Just`) or invalid (`Nothing`). It will only check an available value, a
 * `Nothing` passed to `bindOptional` will return `Right Nothing` on success.
 */
export const bindOptional =
  <A>
  (f: (x: string) => Maybe<A>) =>
  (x: Maybe<string>): Maybe<Maybe<A>> =>
    isNothing (x)
    ? Just (Nothing)
    : fmap<A, Just<A>> (Just) (f (fromJust (x)))

const mapList =
  (del: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    pipe (splitOn (del), mapM (f))

export const mensureMapList =
  (del: string) =>
  (type: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.List (type))
               (bindF (mapList (del) (f)))

export const mensureMapListOptional =
  (del: string) =>
  (type: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.Maybe (Expect.List (type)))
               (bindOptional (mapList (del) (f)))

const mapFixedListBindAfter =
  <A> (pred: (x: List<A>) => Maybe<List<A>>) =>
  (del: string) =>
  (f: (x: string) => Maybe<A>) =>
    pipe (
      splitOn (del),
      mapM (f),
      bindF<List<A>, List<A>> (pred)
    )

export const mensureMapListBindAfter =
  <A> (pred: (x: List<A>) => Maybe<List<A>>) =>
  (del: string) =>
  (type: string) =>
  (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.Maybe (type))
               (bindF (mapFixedListBindAfter (pred) (del) (f)))

export const mensureMapListBindAfterOptional =
  <A> (pred: (x: List<A>) => Maybe<List<A>>) =>
  (del: string) =>
  (type: string) =>
  (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.Maybe (type))
               (bindOptional (mapFixedListBindAfter (pred) (del) (f)))

const mapFixedList =
  (len: number):
  (del: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
  (x: string) => Maybe<List<A>> =>
    mapFixedListBindAfter (ensure (pipe (flength, equals (len))))

export const mensureMapFixedList =
  (len: number) =>
  (del: string) =>
  (type: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.ListLength (len) (type))
               (bindF (mapFixedList (len) (del) (f)))

export const mensureMapFixedListOptional =
  (len: number) =>
  (del: string) =>
  (type: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.Maybe (Expect.ListLength (len) (type)))
               (bindOptional (mapFixedList (len) (del) (f)))

const mapSet =
  (del: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    pipe (splitOn (del), mapM (f), fmap (fromList))

export const mensureMapSetOptional =
  (del: string) =>
  (type: string) =>
  <A> (f: (x: string) => Maybe<A>) =>
    mensureMap (Expect.Maybe (Expect.Set (type)))
               (bindOptional (mapSet (del) (f)))

export const mensureMapNonEmptyString =
  mensureMap (Expect.NonEmptyString)
             (bindF<string, string> (ensure (notNullStr)))

export const mensureMapStringPred =
  (pred: (x: string) => boolean) =>
  (type: string) =>
    mensureMap (Expect.Maybe (type))
               (bindF<string, string> (ensure (pred)))

export const mensureMapNonEmptyStringList =
  (del: string) =>
    mensureMapList (del)
                   (Expect.NonEmptyString)
                   (ensure (notNullStr))

interface mensureMapStringPredOptional {
  <A extends string>
  (pred: (x: string) => x is A):
  (type: string) =>
  (received: Maybe<string>) => Either<string, Maybe<A>>

  (pred: (x: string) => boolean):
  (type: string) =>
  (received: Maybe<string>) => Either<string, Maybe<string>>
}

export const mensureMapStringPredOptional: mensureMapStringPredOptional =
  (pred: (x: string) => boolean) =>
  (type: string) =>
    mensureMap (Expect.Maybe (type))
               (bindOptional (ensure (pred)))

interface mensureMapStringPredListOptional {
  <A extends string>
  (pred: (x: string) => x is A):
  (type: string) =>
  (del: string) =>
  (received: Maybe<string>) => Either<string, Maybe<List<A>>>

  (pred: (x: string) => boolean):
  (type: string) =>
  (del: string) =>
  (received: Maybe<string>) => Either<string, Maybe<List<string>>>
}

export const mensureMapStringPredListOptional: mensureMapStringPredListOptional =
  (pred: (x: string) => boolean) =>
  (type: string) =>
  (del: string) =>
    mensureMapListOptional (del) (type) (ensure (pred))

interface mensureMapStringPredSetOptional {
  <A extends string>
  (pred: (x: string) => x is A):
  (type: string) =>
  (del: string) =>
  (received: Maybe<string>) => Either<string, Maybe<OrderedSet<A>>>

  (pred: (x: string) => boolean):
  (type: string) =>
  (del: string) =>
  (received: Maybe<string>) => Either<string, Maybe<OrderedSet<string>>>
}

export const mensureMapStringPredSetOptional: mensureMapStringPredSetOptional =
  (pred: (x: string) => boolean) =>
  (type: string) =>
  (del: string) =>
    mensureMapSetOptional (del) (type) (ensure (pred))

export const mensureMapNatural =
  mensureMap (Expect.NaturalNumber)
             (bindF (toNatural))

export const mensureMapNaturalOptional =
  mensureMap (Expect.Maybe (Expect.NaturalNumber))
             (bindOptional (toNatural))

export const mensureMapNaturalPred =
  (pred: (x: number) => boolean) =>
    mensureMap (Expect.Maybe (Expect.NaturalNumber))
               (bindF (pipe (
                 toNatural,
                 bindF<number, number> (ensure (pred))
               )))

export const mensureMapNaturalInRange =
  (l: number) =>
  (u: number) =>
    mensureMapNaturalPred (inRange (fromBinary (l, u)))

export const mensureMapNaturalPredOptional =
  (pred: (x: number) => boolean) =>
    mensureMap (Expect.Maybe (Expect.NaturalNumber))
               (bindOptional (pipe (
                 toNatural,
                 bindF<number, number> (ensure (pred))
               )))

export const mensureMapNaturalInRangeOptional =
  (l: number) =>
  (u: number) =>
    mensureMapNaturalPredOptional (inRange (fromBinary (l, u)))

export const mensureMapNaturalList =
  (del: string) =>
    mensureMapList (del) (Expect.NaturalNumber) (toNatural)

export const mensureMapNaturalListOptional =
  (del: string) =>
    mensureMapListOptional (del) (Expect.NaturalNumber) (toNatural)

export const mensureMapNaturalFixedList =
  (len: number) =>
  (del: string) =>
    mensureMapFixedList (len) (del) (Expect.NaturalNumber) (toNatural)

export const mensureMapNaturalFixedListOptional =
  (len: number) =>
  (del: string) =>
    mensureMapFixedListOptional (len) (del) (Expect.NaturalNumber) (toNatural)

export const mensureMapInteger =
  mensureMap (Expect.Integer)
             (bindF (toInt))

export const mensureMapIntegerOptional =
  mensureMap (Expect.Maybe (Expect.Integer))
             (bindOptional (toInt))

export const mensureMapBoolean =
  mensureMap (Expect.Boolean)
             (pipe (
               fromMaybe ("TRUE"),
               ensure ((x: string) => x === "TRUE" || x === "FALSE"),
               fmap (x => x === "TRUE")
             ))

const mapPairList =
  (delPair: string) =>
  <A> (toFst: (x: string) => Maybe<A>) =>
  <B> (toSnd: (x: string) => Maybe<B>) =>
    pipe (
      splitOn (delPair),
      ensure<List<string>> (pipe (flength, equals (2))),
      bindF (
        p =>
        liftM2<A, B, Pair<A, B>>
          (fromBoth)
          (toFst ((p as Cons<string>) .x))
          (toSnd (((p as Cons<string>) .xs as Cons<string>) .x))
      )
    )

export const mensureMapPairList =
  (del: string) =>
  (delPair: string) =>
  (fstType: string) =>
  (sndType: string) =>
  <A> (toFst: (x: string) => Maybe<A>) =>
  <B> (toSnd: (x: string) => Maybe<B>) =>
    mensureMapList (del)
                   (Expect.Pair (fstType) (sndType))
                   (mapPairList (delPair)
                                (toFst)
                                (toSnd))

export const mensureMapPairListOptional =
  (del: string) =>
  (delPair: string) =>
  (fstType: string) =>
  (sndType: string) =>
  <A> (toFst: (x: string) => Maybe<A>) =>
  <B> (toSnd: (x: string) => Maybe<B>) =>
    mensureMapListOptional (del)
                           (Expect.Pair (fstType) (sndType))
                           (mapPairList (delPair)
                                        (toFst)
                                        (toSnd))
